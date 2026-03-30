<?php
// Настройки
$botToken = '8738584329:AAFMiTfTMs_Y3yiycOMeFPVwrTyis_tdfgQ'; // Замените на токен от BotFather
$chatId = '-5197227740';     // Замените на ID чата

// Получаем данные из формы
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$message = htmlspecialchars($_POST['message']);

// Форматируем сообщение для Telegram
$text = "📝 Новая анкета:\n\n";
$text .= "👤 Имя: $name\n";
$text .= "✉️ Email: $email\n";
$text .= "💬 Сообщение: $message";

// Отправляем в Telegram
$url = "https://api.telegram.org/bot$botToken/sendMessage";
$data = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML'
];

$options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    http_response_code(500);
    echo 'Ошибка отправки в Telegram';
} else {
    echo 'Успешно отправлено';
}
?>
