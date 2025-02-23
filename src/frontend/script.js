document.addEventListener("DOMContentLoaded", function() {
    // Botão para gerar estrutura
    document.getElementById("generateBtn").addEventListener("click", function() {
        const inputText = document.getElementById("inputText").value;

        if (!inputText.trim()) {
            alert("Por favor, digite uma estrutura antes de gerar o código!");
            return;
        }

        fetch("http://127.0.0.1:5000/gerar-estrutura", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estrutura: inputText })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("outputCode").textContent = data.codigo.replace(/\n/g, "\n");
        })
        .catch(error => console.error("Erro ao gerar estrutura:", error));
    });

    // Botão para copiar código
    document.getElementById("copyBtn").addEventListener("click", function() {
        const outputCode = document.getElementById("outputCode").textContent;
        
        if (!outputCode.trim()) {
            alert("Nenhum código gerado para copiar!");
            return;
        }

        navigator.clipboard.writeText(outputCode)
            .then(() => alert("Código copiado para a área de transferência!"))
            .catch(err => console.error("Erro ao copiar código:", err));
    });

    // Botão para baixar código como .py
    document.getElementById("downloadBtn").addEventListener("click", function() {
        const outputCode = document.getElementById("outputCode").textContent;
        
        if (!outputCode.trim()) {
            alert("Nenhum código gerado para baixar!");
            return;
        }

        const blob = new Blob([outputCode], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "gerar_estrutura.py";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
