param(
    [Parameter(Mandatory=$true)]
    [string]$key
)

# Retrieve the value from Redis
$result = docker run --rm redis:latest redis-cli -h host.docker.internal -p 6379 GET $key

# Report the result
if ($result) {
    Write-Host "Value for key '$key': $result"
} else {
    Write-Host "No value found for key: $key"
}