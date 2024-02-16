let initialFormData = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
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

  let formData = initialFormData || [];
  function generateId() {
    let template = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
    let uniqueId = template.replace(/x/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
    return uniqueId;
  }

  function renderForm() {
    formContainer.innerHTML = "";

    formData.forEach((ele, index) => {
      const draggableDiv = document.createElement("div");
      draggableDiv.draggable = true;
      draggableDiv.dataset.index = index;

      let newElement;
      if (ele.type === "input") {
        newElement = document.createElement("input");
        newElement.setAttribute("type", "text");
        newElement.setAttribute("name", "input-element");
        newElement.setAttribute("id", "input-element");
      } else if (ele.type === "select") {
        newElement = document.createElement("select");
        newElement.setAttribute("name", "select-element");
        newElement.setAttribute("id", "select-element");
        ele.options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          newElement.appendChild(optionElement);
        });
      } else if (ele.type === "textarea") {
        newElement = document.createElement("textarea");
        newElement.setAttribute("name", "text-area-element");
        newElement.setAttribute("id", "text-area-element");
      }
      ele.type !== "select" &&
        newElement.setAttribute("placeholder", ele.placeholder);

      const label = document.createElement("label");
      label.setAttribute("for", `${newElement.getAttribute("id")}`);
      label.textContent = ele.label;
      // ele.type === "input" &&
      //   label.setAttribute("for", `${newElement.getAttribute(id)}`);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        formData = formData.filter((item) => item.id !== ele.id);

        renderForm();
      });

      // const div = document.createElement("div");
      // div.appendChild(label);
      // div.appendChild(newElement);
      // div.appendChild(deleteButton);

      // formContainer.appendChild(div);
      draggableDiv.appendChild(label);
      draggableDiv.appendChild(newElement);
      draggableDiv.appendChild(deleteButton);
      formContainer.appendChild(draggableDiv);
    });
  }
  renderForm();

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
      id: Math.random().toFixed(4),
      type: "select",
      label: "Sample Label",
      options: ["Sample Option 1", "Sample Option 2", "Sample Option 3"],
    };
    formData.push(newSelectElement);
    renderForm();
  });

  addTextAreaButton.addEventListener("click", function () {
    const newTextareaElement = {
      id: Math.random().toFixed(4),
      type: "textarea",
      label: "Sample Label",
      placeholder: "Sample Placeholder",
    };
    formData.push(newTextareaElement);
    renderForm();
  });
  saveButton.addEventListener("click", function () {
    console.log(formData);
  });
  formContainer.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
  });

  formContainer.addEventListener("dragover", function (event) {
    event.preventDefault();
    // const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
    // const dropTargetIndex = parseInt(event.target.dataset.index);
    // const currentDraggedIndex = document.querySelector(".dragged");
    // if (currentDraggedIndex !== null) {
    //   formContainer.removeChild(document.querySelector(".dragged"));
    // }

    // const draggedElement = document.createElement("div");
    // draggedElement.style.height = event.target.offsetHeight + "px";
    // draggedElement.classList.add("dragged");
    // formContainer.insertBefore(draggedElement, event.target);
  });
  formContainer.addEventListener("drop", function (event) {
    const fromIndex = event.dataTransfer.getData("text/plain");
    const toIndex = event.target.dataset.index;
    const movedElement = formData.splice(fromIndex, 1)[0];

    formData.splice(toIndex, 0, movedElement);

    console.log(
      "fromIndex ---> ",
      fromIndex,
      "toIndex ---> ",
      toIndex,
      "movedElement ---> ",
      movedElement
    );
    renderForm();

    // event.preventDefault();

    // const fromIndex = parseInt(event.dataTransfer.getData("text/plain"));
    // const toIndex = parseInt(event.target.dataset.index);
    // const movedElement = formData.splice(fromIndex, 1)[0];
    // formData.splice(toIndex, 0, movedElement);
    // renderForm();
    // const draggedIndex = parseInt(event.dataTransfer.getData("text/plain"));
    // const currentDraggedIndex = document.querySelector(".dragged");
    // if (currentDraggedIndex !== null) {
    //   formContainer.removeChild(document.querySelector(".dragged"));
    // }
  });
});
