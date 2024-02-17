let initialFormData = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // making sure the DOM is fully loaded before accessing induvidual elements
  const formContainer = document.getElementById("form-container");
  const addInputButton = document.getElementById("add-input");
  const addSelectButton = document.getElementById("add-select");
  const addTextAreaButton = document.getElementById("add-textarea");
  const saveButton = document.getElementById("save");

  //setting default formData to given json data
  let formData = initialFormData || [];

  // function to generate unique id based on given json id template
  function generateId() {
    let template = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    let uniqueId = template.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
    return uniqueId;
  }

  // function to render the Form based on formData data
  function renderForm() {
    formContainer.innerHTML = "";

    // adding elemnts, classes, id, and attributes dynamically to each element of formData
    formData.forEach((ele, index) => {
      // Creating a main draggable div in which the label, input, and delete button will be placed as two elements
      const draggableDiv = document.createElement("div");
      draggableDiv.draggable = true;
      //setting data-index this is helpful in drag and drop events
      draggableDiv.dataset.index = index;
      draggableDiv.setAttribute("class", "single-item");

      // depending on type of element from json data we create differnt element (adding unique id for each element because DOM should identify each element even if same element occuered multiple times)
      let newElement;
      if (ele.type === "input") {
        newElement = document.createElement("input");
        newElement.setAttribute("type", "text");
        newElement.setAttribute("name", "input-element");
        newElement.setAttribute("id", `input-element-${index}`);
      } else if (ele.type === "select") {
        newElement = document.createElement("select");
        newElement.setAttribute("name", "select-element");
        newElement.setAttribute("id", `select-element-${index}`);
        ele.options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          newElement.appendChild(optionElement);
        });
      } else if (ele.type === "textarea") {
        newElement = document.createElement("textarea");
        newElement.setAttribute("name", "text-area-element");
        newElement.setAttribute("id", `text-area-element-${index}`);
      }

      // Setting a place holder if not a select element
      ele.type !== "select" &&
        newElement.setAttribute("placeholder", ele.placeholder);

      // adding label with unique id dynamically (even if elemnt is same with multiple occurances the Dom should identify it uniquely)
      const label = document.createElement("label");
      label.setAttribute("for", `${newElement.getAttribute("id")}`);
      label.setAttribute("class", "label");
      label.textContent = ele.label;

      // adding delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("class", "delete-button");
      deleteButton.innerHTML = '<span class="icon delete">&#128465;</span>';
      deleteButton.addEventListener("click", function () {
        const IndexToRemove = formData.findIndex((item) => item.id === ele.id); //improvization
        if (IndexToRemove !== -1) {
          // if element found remove it and re-render the form
          formData.splice(IndexToRemove, 1);
          renderForm();
        } else {
          // log any error if exist
          console.error("Element Index Not Found");
        }
      });
      // Creating a container div for label and input elements
      const fieldContainer = document.createElement("div");
      fieldContainer.setAttribute("class", "flex");
      fieldContainer.appendChild(label);
      fieldContainer.appendChild(newElement);

      //Appening lable, input, delete button to draggableDiv
      draggableDiv.appendChild(fieldContainer);
      draggableDiv.appendChild(deleteButton);

      //adding draggableDiv to forContainer
      formContainer.appendChild(draggableDiv);
    });
  }
  //initial form rendering
  renderForm();

  // button Event Listeners for adding input, select, textarea elements
  addInputButton.addEventListener("click", function () {
    const newInputElement = {
      id: generateId(),
      type: "input",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    };
    formData.push(newInputElement);
    renderForm();
  });

  addSelectButton.addEventListener("click", function () {
    let newSelectElement = {
      id: generateId(),
      type: "select",
      label: "Sample Label",
      options: ["Sample Option", "Sample Option", "Sample Option"],
    };
    formData.push(newSelectElement);
    renderForm();
  });

  addTextAreaButton.addEventListener("click", function () {
    const newTextareaElement = {
      id: generateId(),
      type: "textarea",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    };
    formData.push(newTextareaElement);
    renderForm();
  });

  // Event listener for logging the updated form JSON
  saveButton.addEventListener("click", function () {
    console.log(formData);
  });

  // Event listeners for drag and drop functionality
  formContainer.addEventListener("dragstart", function (event) {
    //making use of dataTransfer proprty of dragstart event and settign data to be dragged (index of dragged element)
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
  });

  formContainer.addEventListener("dragover", function (event) {
    // preventing the default browser of not allowing us to drop an element on to other. (drop event wont trigger with out this)
    event.preventDefault();
  });
  formContainer.addEventListener("drop", function (event) {
    // previnting the default browser behaviour of intercenpting the drop event and trying to open it as url
    event.preventDefault();

    const fromIndex = parseInt(event.dataTransfer.getData("text/plain"));
    let target = event.target.closest(".single-item");
    if (!target) {
      console.log("target dom element is not found");
      return;
    }
    const toIndex = parseInt(target.dataset.index); // Get the index from the parent node
    // remove the  element at fromIndex and return it since we only remove one element [0] is used to return that removed element
    const movedElement = formData.splice(fromIndex, 1)[0];

    // again using splice method to insert the movedElement at target index (toIndex) and 0 is used to not remove any other elements
    formData.splice(toIndex, 0, movedElement);
    renderForm();
  });
});
