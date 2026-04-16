async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const status = document.getElementById("status");

  if (!file) {
    alert("Select file");
    return;
  }

  status.innerText = "Uploading...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  status.innerText = "Done";

  const link = document.getElementById("link");
  link.href = data.secure_url;
  link.innerText = "Open File";
    }
