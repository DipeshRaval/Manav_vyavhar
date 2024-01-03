let textElement = document.getElementById("page-container");

async function handleSelection() {
    var selectedText = "";

    // Check if there is any selected text
    if (window.getSelection) {
        selectedText = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        // For older versions of Internet Explorer
        selectedText = document.selection.createRange().text;
    }

    // Display the selected text
    // document.getElementById("output").textContent = "Selected text: " + selectedText;

    console.log(selectedText)
    if (selectedText) {
        const resultObject = await getObjectByKey('hindi', selectedText.trim());
        if (resultObject) {
            console.log('Object found:', resultObject);
            let mean = resultObject.paribhasha.join("\n")

            // alert(`${selectedText} : \n${mean}`)
            openModal(selectedText, mean)
        } else {
            alert('Details not found that word');
        }
    }
}


if (textElement.addEventListener) {
    textElement.addEventListener("mouseup", handleSelection);
} else if (textElement.attachEvent) {
    // For older versions of Internet Explorer
    textElement.attachEvent("onmouseup", handleSelection);
}

// fetch json
async function fetchDate() {
    let res = await fetch('./data.json')
    return await res.json()
}

// find a word in json
async function getObjectByKey(key, value) {
    let data = await fetchDate()
    // console.log(data);
    return data.find(item => item[key] === value);
}

// deselect logic
function handleDeselection() {
    // Deselect the text
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    } else if (document.selection) {
        document.selection.empty();
    }
}

// deselect text
document.body.addEventListener("mousedown", handleDeselection);

// modal
const modal = document.getElementById('myModal');

// Get the read-only input and textarea elements
const readOnlyInput = document.getElementById('readOnlyInput');
const readOnlyTextarea = document.getElementById('readOnlyTextarea');

// Function to open the modal
function openModal(input, mean) {
    modal.style.display = 'block';
    // Set values for the read-only fields
    readOnlyInput.value = `${input}`;
    readOnlyTextarea.value = `${mean}`;
}

// Function to close the modal
function closeModal() {
    modal.style.display = 'none';
}
