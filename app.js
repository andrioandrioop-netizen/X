import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCs8xpXbpp2CkCp9y_wjRlo1or0VcNcZv8",
  authDomain: "experimental-29ccd.firebaseapp.com",
  projectId: "experimental-29ccd",
  storageBucket:"experimental-29ccd.firebasestorage.app",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

window.uploadFile = async function () {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Select a file first!");
    return;
  }

  const status = document.getElementById("status");
  status.innerText = "Uploading...";

  try {
    const storageRef = ref(storage, "uploads/" + Date.now() + "_" + file.name);

    await uploadBytes(storageRef, file);

    const url = await getDownloadURL(storageRef);

    status.innerText = "Upload successful!";

    const link = document.getElementById("downloadLink");
    link.href = url;
    link.innerText = "Download File";

  } catch (err) {
    console.error(err);
    status.innerText = "Upload failed";
  }
};