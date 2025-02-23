from pathlib import Path

class CodeGenerator:
    def __init__(self, structure):
        self.structure = structure

    def generate_code(self):
        """
        Gera o código Python para criar a estrutura de pastas/arquivos no diretório onde o script for executado.
        """
        code_lines = ["from pathlib import Path", ""]
        code_lines.append("base_path = Path.cwd() / 'meu-projeto'")  # 🔹 Usa a pasta onde o script está rodando
        code_lines.append("base_path.mkdir(parents=True, exist_ok=True)")

        for item in self.structure:
            path = f'base_path / "{item["path"].lstrip("/")}"'  # 🔹 REMOVE a barra inicial dos caminhos

            if item["type"] == "folder":
                code_lines.append(f'({path}).mkdir(parents=True, exist_ok=True)')
            elif item["type"] == "file":
                code_lines.append(f'({path}).touch()')

        code_lines.append('\nprint(f"Estrutura criada com sucesso em: {base_path}")')
        return "\n".join(code_lines)
