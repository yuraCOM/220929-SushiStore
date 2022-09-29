import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from "../../FireBase/firebase";

function AddFile() {

    const [progress, setProgress] = useState(0);

    const formHandler = (e) => {
        console.log(file);
        e.preventDefault();
        const file = e.target[0].files[0];

        uploadFiles(file);
    };


    const uploadFiles = (file) => {

        if (!file) return
        const storageRef = ref(storage, `files/${file.name}`)
        uploadBytes(storageRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

    };

    return (
        <div className="App">
            <form onSubmit={formHandler}>
                <input type="file" className="input" />
                <button type="submit">Upload</button>
            </form>
            <hr />
            <h2>Uploading done {progress}%</h2>
        </div>
    );
}

export default AddFile;
