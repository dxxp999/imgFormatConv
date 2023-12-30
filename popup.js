document.getElementById('image-select').addEventListener('change', handleFileSelect);
document.getElementById('submit-button').addEventListener('click', convertImage);

function handleFileSelect(event) {
 const file = event.target.files[0];
 console.log('Selected file:', file);
}

async function convertImage() {
 const fileSelect = document.getElementById('image-select');
 const formatSelect = document.getElementById('format-select');
 const file = fileSelect.files[0];
 const format = formatSelect.value;

 if (!file) {
    alert('Please select an image file');
    return;
 }

 try {
    const response = await fetch(URL.createObjectURL(file));
    const blob = await response.blob();
    const convertedBlob = new Blob([blob], { type: format });
    const url = URL.createObjectURL(convertedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `converted.${format.split('/')[1]}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
 } catch (error) {
    console.error('Error converting image:', error);
    alert('Error converting image. Please try again.');
 }
}