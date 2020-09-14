const formToJSON = (elements) => {
    const jsonData = {};

    for (const element of elements) {
        //console.log(element.type, element.id, element.value);

        if (element.type === 'text' || element.type === 'select-one' || element.type === 'textarea' || element.type === 'number')
            jsonData[element.id] = element.value;

        if (element.type === 'checkbox')
            jsonData[element.id] = element.checked;

        if (element.type === 'radio' && element.checked)
            jsonData[element.name] = element.value;
    }

    return jsonData;
};

const sendButton = document.getElementById('sendButton');

if (sendButton) {
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();

        const formElements = this.parentElement.elements;

        if (formElements) {
            const json = formToJSON(formElements);

            // if (json) {
            //     const jsonContainer = document.getElementById('json');
            //     jsonContainer.innerText = JSON.stringify(json);
            //     console.log(json);
            // }
        }
    });
}
