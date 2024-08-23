<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Email Confirmation</title>
    <style>
        /* Add some basic styling to your email */
        body {
            font-family: Arial, sans-serif;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #007BFF;
            color: #fff;
            text-align: center;
            padding: 20px;
        }

        .content {
            padding: 20px;
        }

        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Confirmation Successful</h1>
        </div>
        <div class="content">
            <p>Your email has been successfully confirmed. You can now start using our services.</p>
            <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
            <p>Thank you for choosing our service!</p>
        </div>
        <div style="text-align: center;">
            <a class="button" href="http://localhost:3000/signup">Go to Website</a>
        </div>
    </div>
</body>
</html>