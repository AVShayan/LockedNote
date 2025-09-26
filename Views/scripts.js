
const noteForm = document.getElementById("noteForm");
const notesList = document.getElementById("notesList");
const logout = document.getElementById("logoutBtn");

renderNotes();
async function getNotes(){
    const res = await fetch("http://localhost:3500/notes",{
        method: "GET",
        headers: {"Content-Type":"application/json"},
        credentials: "include",
    });
    return res.json();
}

async function createNotes(data){
    const res = await fetch("http://localhost:3500/notes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        credentials: "include",
        body: data,
    });
    return res.json();
}
async function updateNote(data,ID){
    const res = await fetch(`http://localhost:3500/notes/${ID}`,{
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        credentials:"include",
        body: data,
        });
        await renderNotes();
}

async function deleteNote(ID){
    const res = await fetch(`http://localhost:3500/notes/${ID}`,{
        method: "DELETE",
        headers: {"Content-Type":"application/json"},
        credentials:"include",
    });
    await renderNotes();
}

async function logoutCurrentUser(){
    const res = await fetch("http://localhost:3500/logout",{
        method:"POST",
        credentials:"include",
    });
    if(res.ok)
        window.location.href="http://localhost:3500";
}
// renderNotes() displays the notes list after any changes have been made
async function renderNotes(){
    try{ ;
        const notes = await getNotes();
        notesList.innerHTML='';  
        notes.forEach((note)=>{ 
        // We create a new div called notecard and also a new class called note-card
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        const title = document.createElement('div');
        title.classList.add('note-title');
        title.textContent = note.title;

        const content = document.createElement('div');
        content.classList.add('note-content');
        content.textContent = note.content;

        const actions = document.createElement('div');
        actions.classList.add('note-actions');

        const editBtn = document.createElement('div');
        editBtn.classList.add('btn');
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click",() => {
            alert('Please confirm if you want to change the notes with new title and content!');
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const data = JSON.stringify({'title':title,'content':content});
            updateNote(data,note._id);
        })

        const delBtn = document.createElement('div');
        delBtn.classList.add('btn');
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click",() => deleteNote(note._id));

        actions.appendChild(editBtn);
        actions.appendChild(delBtn);

        noteCard.appendChild(title);
        noteCard.appendChild(content);
        noteCard.appendChild(actions);

        notesList.appendChild(noteCard);
    })
        
    }catch{
        console.error("Error Getting Notes of the user")
    }
}

noteForm.addEventListener("submit",async (e)=>{   // We consider noteForm as a way to create new notes
    e.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const newNote = {"title":title,"content":content};
    await createNotes(JSON.stringify(newNote));   // we add new note every time a user adds it
    renderNotes();
    noteForm.reset();
}); 

logout.addEventListener("click",async() => await logoutCurrentUser());