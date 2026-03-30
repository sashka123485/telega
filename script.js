document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        position: document.getElementById('position').value,
        school: document.getElementById('school').value,
        city: document.getElementById('city').value,
        age: document.getElementById('age').value
    };
    
    sendToTelegram(formData);
});

async function sendToTelegram(data) {
    const botToken = '8738584329:AAFMiTfTMs_Y3yiycOMeFPVwrTyis_tdfgQ'; // Замените на токен вашего бота
    const chatId = '-5197227740'; // Замените на ID чата
    
    const message = `
📋 *Новая анкета*

1. *Имя:* ${data.name}
2. *Класс:* ${data.position}
3. *Школа:* ${data.school}
4. *Город:* ${data.city}
5. *Возраст:* ${data.age} лет
    `.trim();
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        if (response.ok) {
            alert('Анкета успешно отправлена!');
            document.getElementById('myForm').reset();
        } else {
            alert('Ошибка при отправке. Попробуйте ещё раз.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка сети.');
    }
}
