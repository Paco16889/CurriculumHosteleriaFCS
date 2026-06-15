$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root

if (-not (Test-Path "node_modules\puppeteer-core")) {
  Write-Host "Instalando dependencia para generar PDF (solo la primera vez)..."
  npm install --no-save puppeteer-core 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) {
    Write-Error "No se pudo instalar puppeteer-core. Ejecuta: npm install"
    exit 1
  }
}

node generar-pdf.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
