# Java Runtime Setup - Complete Guide

## Problem Resolved ✅

Your system had a **conflicting JAVA_HOME configuration**:
- **System-level**: `JAVA_HOME = C:\Program Files\Java\jdk-26` (Java 26)
- **User-level**: `JAVA_HOME = C:\Users\harry\.jdks\openjdk-21.0.2` (Java 21)

The system-level setting was taking priority, causing Maven to use Java 26 which has compatibility issues with the project compiler.

## Solution Applied

### 1. **PowerShell Profile Configuration**
Created `C:\Users\harry\Documents\PowerShell\Microsoft.PowerShell_profile.ps1` which:
- Automatically sets `JAVA_HOME` to Java 21 LTS when PowerShell starts
- Adds Java 21 bin directory to PATH
- Outputs a confirmation message (green checkmark) on startup

### 2. **Environment Setup**
- User-level `JAVA_HOME` → Java 21 LTS ✓
- Java path precedence → Java 21 bin first in PATH ✓
- Maven integration → Uses Java 21 automatically ✓

## How to Use

### For New Terminal Sessions (Automatic)
1. Open PowerShell
2. You'll see: `✓ Java 21 LTS configured`
3. Run your Maven commands as normal:
   ```powershell
   mvn clean install
   mvn clean package
   mvn spring-boot:run
   ```

### Current Status
```
Java Version: 21.0.2 (OpenJDK LTS)
Build Tool: Maven 3.9.9
pom.xml java.version: 21
Spring Boot: 3.4.0
Build: ✅ PASSING
JAR Location: target/task-manager-backend-1.0.0.jar
```

## What If Profile Doesn't Load?

If for some reason the profile doesn't load automatically:

**Option 1: Manual Load (One-time)**
```powershell
& $profile
mvn clean install
```

**Option 2: Skip Profile (Set Environment Variable)**
```powershell
$env:JAVA_HOME_SKIP = "1"
```

**Option 3: Check Profile Location**
```powershell
$profile  # Shows your profile path
Test-Path $profile  # Should return True
```

## Verification Commands

Check if Java 21 is active:
```powershell
java -version      # Should show "openjdk version "21.0.2""
$env:JAVA_HOME     # Should show Java 21 path
mvn -version       # Should show Java 21.0.2
```

## Next Steps

Your project is now fully configured with Java 21 LTS:
- ✅ Source/Target: Java 21
- ✅ Spring Boot: 3.4.0 (compatible with Java 21)
- ✅ Lombok: Annotation processor configured
- ✅ Build: Successful (12.5 seconds)
- ✅ JAR: Ready for deployment

You can now build and run the application with confidence!

---

**Note**: Java 26 remains on your system but won't interfere. The profile configuration ensures Java 21 LTS is used for all Maven builds. System administrators can remove Java 26 later if desired.
