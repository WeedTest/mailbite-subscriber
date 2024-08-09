param()

Remove-Item -Path .\storage\*.log
Remove-Item -Path .\*.zip

# Get the APP_NAME value from the context
$name = (Get-Content -Path '.env' -Raw | ConvertFrom-StringData)['APP_NAME']

# Transform the APP_NAME value to kebab case
$name = $name.ToLower() -replace '\s+', '-' -replace '"', ''

$files = Get-ChildItem -Path . -Exclude (Get-Content '.zipignore')

Compress-Archive -Path $files -DestinationPath ($name + ".zip") -CompressionLevel Fastest

Write-Output 'code zipped'