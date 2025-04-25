param(
    [Parameter(Mandatory=$true)]
    [string]$key,
    
    [Parameter(Mandatory=$true)]
    [string]$value,
    
    [Parameter(Mandatory=$false)]
    [int]$expireSeconds = 0
)

# Store the value in Redis
if ($expireSeconds -gt 0) {
    # Set with expiration
    $result = docker run --rm redis:latest redis-cli -h host.docker.internal -p 6379 SETEX $key $expireSeconds $value
} else {
    # Set without expiration
    $result = docker run --rm redis:latest redis-cli -h host.docker.internal -p 6379 SET $key $value
}

# Report the result
if ($result -eq "OK") {
    Write-Host "Successfully stored value for key: $key"
    if ($expireSeconds -gt 0) {
        Write-Host "This key will expire in $expireSeconds seconds"
    }
} else {
    Write-Host "Error storing value: $result"
}