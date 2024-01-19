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

function getSelectedText() {
  selectedText = window.getSelection().toString();
  rangeOfText = window.getSelection().getRangeAt(0);
}

function getSelected(style) {
  if (selectedText) {
    const div = document.createElement("span");
    div.classList.add(style);
    div.innerHTML = selectedText;
    rangeOfText.deleteContents();
    rangeOfText.insertNode(div);
  }
}

function deleteNote(e) {
  const areYouSure = confirm("Vážně to chceš smazat?? A není to škoda??");
  if (areYouSure) {
    e.target.parentElement.parentElement.remove();
    saveNoteData();
  }
}

function createNewNote(initialContent) {
  const stickyNote = document.createElement("div");
  stickyNote.classList.add("note");
  const htmlForNote = `
        <div contenteditable="true" class="noteEditor" id="noteEditor">${initialContent}</div>
        <div class="noteControls">
        </div>
  `;
  stickyNote.innerHTML = htmlForNote;

  /*
        <div onclick="getSelected('capitalize')" class="capitalize">Aa</div>
        <div onclick="getSelected('bold')" class="bold">B</div>
        <div onclick="getSelected('italic')" class="italic">I</div>
        <div onclick="getSelected('underline')" class="underline">U</div>
        <div onclick="getSelected('lineThrough')" class="lineThrough">ab</div>
        <hr />
        <img src="images/bin.png" id="bin" class="bin"onclick="DeleteNote(this)" />
        </div>
  */
  const controls = stickyNote.querySelector(".noteControls");
  [["capitalize", "Aa"], ["bold", "B"], ["italic", "I"], ["underline", "U"], ["lineThrough", "ab"]].forEach((cls) => {
    const control = document.createElement("div");
    control.classList.add(cls[0]);
    control.addEventListener("click", () => getSelected(cls[0]));
    control.innerHTML = cls[1];
    controls.appendChild(control);
  });
  controls.innerHTML += "<hr>";

  const trash = document.createElement("img");
  trash.src = "images/bin.png";
  trash.classList.add("bin");
  trash.addEventListener("click", (e) => deleteNote(e));
  controls.appendChild(trash);

  container.appendChild(stickyNote);

  stickyNote.firstElementChild.addEventListener("mouseup", () => getSelectedText());

  stickyNote.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // document.execCommand("insertHTML", false, "<br/>");
      // return false;
      stickyNote.firstElementChild.innerHTML += "<br>";
      event.preventDefault();
    }
  });
  saveNoteData();
}

document.addEventListener("keydown", (stickyNote) => {
  if (stickyNote.ctrlKey && stickyNote.key === "s") {
    stickyNote.preventDefault();
    saveNoteData();
  }
});

function readData() {
  noteContent.forEach((element) => {
    createNewNote(element.value);
  });
}

readData();