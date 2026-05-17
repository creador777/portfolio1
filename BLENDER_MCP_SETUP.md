# Setup Blender MCP — paso a paso

El objetivo: que Claude Code (yo) me pueda conectar a tu Blender 5.1 y modelar escenas para vos.

## Cómo funciona

```
Claude Code  <----MCP---->  Servidor Python (uv)  <----TCP---->  Addon en Blender
```

1. Un servidor Python corre en tu máquina (lo instala `uv`).
2. Un addon dentro de Blender abre un socket TCP.
3. Claude Code se conecta al servidor MCP y puede mandar comandos Python que Blender ejecuta.

## Tu parte (~5 min)

### 1. Bajar el addon de Blender MCP

Hay dos forks principales mantenidos. El más estable a mayo 2026:
- https://github.com/ahujasid/blender-mcp

Bajar el archivo `addon.py` del repo (botón "Download raw" o copiar el contenido).

### 2. Instalar el addon en Blender

1. Abrir Blender 5.1
2. Edit → Preferences → Add-ons
3. Botón "Install from Disk" (esquina superior derecha) → seleccionar el `addon.py`
4. Activar la casilla del addon "Interface: Blender MCP"
5. Guardar preferencias

### 3. Activar el servidor dentro de Blender

1. En el viewport 3D, presionar `N` para abrir el side panel
2. Vas a ver una tab nueva "BlenderMCP"
3. Click en "Connect to Claude" o "Start MCP Server"
4. Te dice que está escuchando en `localhost:9876`

### 4. Avisarme cuando esté corriendo

Cuando veas el mensaje "MCP Server listening on port 9876" en Blender, me decís y yo configuro mi lado.

## Mi parte (cuando esté listo el tuyo)

Yo agrego al `.claude/settings.json` la conexión al servidor MCP, así:

```json
{
  "mcpServers": {
    "blender": {
      "command": "uvx",
      "args": ["blender-mcp"]
    }
  }
}
```

Y a partir de ahí, en esta misma conversación, te puedo decir:
- "crea una escena con un edificio arquitectónico tipo Joseph"
- "agregame iluminación de madrugada azul"
- "exportame esto a GLTF con Draco"

Y lo hace en tu Blender, vos lo ves en tiempo real.

## Si algo no funciona

- Si Blender no muestra la tab BlenderMCP → revisar que el addon esté activado en Preferences
- Si el puerto 9876 está ocupado → cerrar lo que lo use, o cambiar el puerto en el addon
- Si `uvx` no funciona → tenés `uv 0.11.7` instalado, así que `uvx blender-mcp` debería andar directo
