from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Clave de API de OpenAI
openai.api_key = "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"

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": user_input}]
        )
        return jsonify({"reply": response['choices'][0]['message']['content']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
