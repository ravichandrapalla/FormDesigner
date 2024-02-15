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

  function renderForm() {
    formContainer.innerHTML = "";

    formData.forEach((ele) => {
      let newElement;
      if (ele.type === "input") {
        newElement = document.createElement("input");
        newElement.setAttribute("type", "text");
      } else if (ele.type === "select") {
        newElement = document.createElement("select");
        ele.options.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.textContent = option;
          newElement.appendChild(optionElement);
        });
      } else if (ele.type === "textarea") {
        newElement = document.createElement("textarea");
      }
      ele.type !== "select" &&
        newElement.setAttribute("placeholder", ele.placeholder);

      const label = document.createElement("label");
      label.textContent = ele.label;

      const deleteButton = document.createElement("button");
      deleteButton.addEventListener("click", function () {
        formData = formData.filter((item) => item.id !== ele.id);

        renderForm();
      });

      const div = document.createElement("div");
      div.appendChild(label);
      div.appendChild(newElement);
      div.appendChild(deleteButton);

      formContainer.appendChild(div);
    });
  }
  renderForm();

  addInputButton.addEventListener("click", function () {
    const newInputElement = {
      id: Math.random().toFixed(4),
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
});
