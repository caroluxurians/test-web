const container = document.getElementById("container");
let selectedText = "";
let rangeOfText = "";
let noteContent = JSON.parse(localStorage.getItem("noteContent") || "[]");

function saveNoteData() {
  console.log("saving");
  noteContent = [];
  localStorage.setItem("noteContent", []);
  const noteEditor = document.querySelectorAll(".noteEditor");
  noteEditor.forEach((stickyNote) => {
    if (stickyNote.innerHTML !== "") {
      const HTML = {
        value: stickyNote.innerHTML
      };
      noteContent.push(HTML);
    }
  });

  localStorage.setItem("noteContent", JSON.stringify(noteContent));
}

function createNewNote(initialContent) {
  const stickyNote = document.createElement("div");
  stickyNote.classList.add("note");
  const htmlForNote = `
        <div contenteditable="true" class="noteEditor" id="noteEditor" onmouseup="getSelectedText()">${initialContent}</div>
        <div class="noteControls">
        <div onclick="getSelected('capitalize')" class="capitalize">Aa</div>
        <div onclick="getSelected('bold')" class="bold">B</div>
        <div onclick="getSelected('italic')" class="italic">I</div>
        <div onclick="getSelected('underline')" class="underline">U</div>
        <div onclick="getSelected('lineThrough')" class="lineThrough">ab</div>
        <hr />
        <img src="images/bin.png" id="bin" class="bin"onclick="DeleteNote(this)" />
        </div>
  `;
  stickyNote.innerHTML = htmlForNote;
  container.appendChild(stickyNote);

  const noteEditor = document.querySelectorAll(".noteEditor");
  noteEditor.forEach((el) => el.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // document.execCommand("insertHTML", false, "<br/>");
      // return false;
      //el.innerHTML += "<br>";
      event.preventDefault();
    }
  }));
  saveNoteData();
}

document.addEventListener("keydown", (stickyNote) => {
  if (stickyNote.ctrlKey && stickyNote.key === "s") {
    stickyNote.preventDefault();
    saveNoteData();
  }
});

readData();

function readData() {
  noteContent.forEach((element) => {
    createNewNote(element.value + "<br />");
  });
}

function getSelectedText() {
  selectedText = window.getSelection().toString();
  rangeOfText = window.getSelection().getRangeAt(0);
}

function getSelected(style) {
  if (selectedText) {
    const div = document.createElement("span");
    div.classList.add(style);
    div.innerHTML = selectedText;
    range < OfText.deleteContents();
    rangeOfText.insertNode(div);
  }
}

function DeleteNote(e) {
  const areYouSure = confirm("Vážně to chceš smazat?? A není to škoda??");
  if (areYouSure) {
    e.parentElement.parentElement.remove();
    saveNoteData();
  }
}