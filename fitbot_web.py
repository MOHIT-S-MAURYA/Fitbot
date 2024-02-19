from flask import Flask, render_template, request, jsonify
import replicate
import os

DEFAULT_REPLICATE_API_TOKEN = "r8_RwNjfnspkp0tCvTXAQaYHbDAX3saT8b2Ov55G"

app = Flask("Fitbot")

messages = [{"role": "assistant", "content": "How may I assist you today?"}]

def generate_llama2_response(prompt_input, messages):
    string_dialogue = "You are a health, fitness, and nutrition expert."
    for dict_message in messages:
        if dict_message["role"] == "user":
            string_dialogue += f"\nUser: {dict_message['content']}"
        else:
            string_dialogue += f"\nAssistant: {dict_message['content']}"

    output = replicate.run('a16z-infra/llama13b-v2-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',input={"prompt": f"{string_dialogue} \n\n{prompt_input} Assistant: ","temperature": 0.1, "top_p": 0.9, "max_length": 512, "repetition_penalty": 1})
    return output

@app.route('/')
def index():
    return render_template('index.html', messages=messages)

@app.route('/process_user_input', methods=['POST'])
def process_user_input():
    user_input = request.form['user_input'].strip()

    if user_input.lower() == 'exit':
        return jsonify({'final_chat_history': messages})

    messages.append({"role": "user", "content": user_input})
    response = generate_llama2_response(user_input, messages)
    full_response = ''
    for item in response:
        full_response += item
    messages.append({"role": "assistant", "content": full_response})

    return jsonify({'messages': messages})

if __name__ == "__main__":
    os.environ['REPLICATE_API_TOKEN'] = DEFAULT_REPLICATE_API_TOKEN
    app.run(debug=True)
