const form = document.getElementById("form");
form.addEventListener("submit", handleRegisterPerson);

async function handleRegisterPerson(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    name: formData.get('name'),
    age: formData.get('age'),
    gender: formData.get('gender'),
    state: formData.get('state'),
    grade: formData.get('grade')
  };

  try {
    const res = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert('SAVED STUDENT');
    } else {
      alert('ERROR WHILE SAVING STUDENT');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de conexão com o servidor');
  }
}
