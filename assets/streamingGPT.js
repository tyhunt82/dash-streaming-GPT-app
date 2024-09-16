window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        streaming_GPT: async function streamingGPT(n_clicks, prompt) {
            
            // id of the window we want to write the response to
            // you may use dynamically created id's here if you have multiple windows 
            // eg "#response-window-${element_id}"
            const responseWindow = document.querySelector("#response-window");
            
            marked.setOptions({
                highlight: function(code) {
                    return hljs.highlightAuto(code).value;
                }
            });

            const apiKey = 'AIzaSyAmSLKSssw-YIaKubE7vuLoAxtWwpHb9IY'; 

            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": prompt
                                }
                            ]
                        }
                    ]
                }),
            });

            const decoder = new TextDecoder();
          

            const reader = response.body.getReader();
            let chunks = "";
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks += decoder.decode(value);
                const htmlText = marked.parse(chunks); 
                responseWindow.innerHTML = htmlText;
            }
            
            return false;
          }
    }
});