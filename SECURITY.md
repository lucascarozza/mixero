# Security Policy

## Reporting Vulnerabilities

To maintain security, **DO NOT** disclose vulnerabilities through public channels. Follow this process:

1. Navigate to "Security" > "Report a vulnerability"

2. Provide a comprehensive report including:
    - Detailed vulnerability description
    - Complete reproduction steps
    - Impact assessment
    - Supporting materials (logs, screenshots)

Initial triage response: 48 hours maximum

## Dependency Management

Automated security monitoring via GitHub Dependabot ensures continuous protection:

- Real-time vulnerability scanning
- Automated remediation through pull requests:
    - Critical security patches (immediate priority)
    - Dependency version updates
    - Backwards compatibility maintenance
- Full audit trails with detailed changelogs

Monitor Dependabot activity:
- Security dashboard: "Security" > "Dependabot alerts"
- Pull requests feed: Filter by Dependabot

## Scope

### In Scope
- Production application (mixero.netlify.app)
- Core repository components
- Spotify integration layer

### Out of Scope
- Spotify API infrastructure
- Previously triaged issues (wontfix)
- External service dependencies

---

Your security contributions help protect Mixero!
