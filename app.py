from flask import Flask, render_template, request, send_file, redirect, url_for
import random, string
import qrcode
import os
import webbrowser

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/generate', methods=['GET', 'POST'])
def generate():
    password = ""
    qr_created = False
    if request.method == 'POST':
        length = int(request.form['length'])
        use_upper = 'uppercase' in request.form
        use_lower = 'lowercase' in request.form
        use_digits = 'digits' in request.form
        use_symbols = 'symbols' in request.form

        characters = ""
        if use_upper:
            characters += string.ascii_uppercase
        if use_lower:
            characters += string.ascii_lowercase
        if use_digits:
            characters += string.digits
        if use_symbols:
            characters += string.punctuation

        if characters:
            password = ''.join(random.choice(characters) for _ in range(length))

            # Generate QR code
            img = qrcode.make(password)
            img.save("generated_qr.png")
            qr_created = True

    return render_template('generate.html', password=password, qr=qr_created)

@app.route('/qr')
def qr():
    return send_file("generated_qr.png", mimetype='image/png')

if __name__ == '__main__':
    webbrowser.open("http://127.0.0.1:5000")
    app.run(debug=True)
