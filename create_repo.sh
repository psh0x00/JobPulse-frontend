#!/bin/bash
set -e

# Make sure we have an initial commit
git add .
git commit -m "chore: initial Vite + React + TypeScript setup" || echo "Already committed"

# Create the repository and push
echo "Creating GitHub repository..."
gh repo create JobPulse-frontend --public --source=. --remote=origin --push || echo "Repo might already exist"

# Create Milestones
echo "Creating milestones..."
gh api repos/psh0x00/JobPulse-frontend/milestones -f title="Sprint 1 — Foundation" -f state="open" -f description="Project setup, auth flow, and a working dashboard." > m1.json || echo "Sprint 1 milestone exists"
gh api repos/psh0x00/JobPulse-frontend/milestones -f title="Sprint 2 — Core CRUD UI" -f state="open" -f description="Full Applications page with create, list, filter, and detail view." > m2.json || echo "Sprint 2 milestone exists"
gh api repos/psh0x00/JobPulse-frontend/milestones -f title="Sprint 3 — Polish + Charts + Deploy" -f state="open" -f description="Data visualization, responsive design, and live deployment." > m3.json || echo "Sprint 3 milestone exists"

# Extract milestone numbers (assuming they are 1, 2, 3 but safer to parse if jq is available)
M1=$(grep -o '"number": [0-9]*' m1.json | head -1 | awk '{print $2}')
M2=$(grep -o '"number": [0-9]*' m2.json | head -1 | awk '{print $2}')
M3=$(grep -o '"number": [0-9]*' m3.json | head -1 | awk '{print $2}')

# Fallback if parsing fails
M1=${M1:-1}
M2=${M2:-2}
M3=${M3:-3}

echo "Milestones: $M1, $M2, $M3"

# Sprint 1 Issues
echo "Creating Sprint 1 issues..."
gh issue create -t "Initialize Vite + React + TypeScript project" -b "Run npm create vite@latest" -m $M1
gh issue create -t "Install and configure TailwindCSS 4" -b "Set up Tailwind utility classes" -m $M1
gh issue create -t "Set up project folder structure" -b "api/, components/, pages/, context/, types/" -m $M1
gh issue create -t "Create axiosClient.ts with base URL and JWT interceptor" -b "Configure Axios to use .env and inject JWT tokens" -m $M1
gh issue create -t "Create AuthContext.tsx" -b "Manage login/logout/token state globally" -m $M1
gh issue create -t "Build Login Page" -b "form → calls POST /api/v1/auth/login → stores token" -m $M1
gh issue create -t "Build Register Page" -b "form → calls POST /api/v1/auth/register → stores token" -m $M1
gh issue create -t "Implement ProtectedRoute.tsx wrapper" -b "Protect dashboard and other routes from unauthenticated users" -m $M1
gh issue create -t "Build Dashboard Page" -b "fetch stats from GET /api/v1/dashboard/stats, display in cards" -m $M1
gh issue create -t "Add a basic Sidebar/Navbar layout" -b "Main navigation UI" -m $M1

# Sprint 2 Issues
echo "Creating Sprint 2 issues..."
gh issue create -t "Build Applications Page" -b "Table with pagination" -m $M2
gh issue create -t "Add New Application modal" -b "With React Hook Form + Zod validation" -m $M2
gh issue create -t "Implement search and status filter" -b "On Applications page" -m $M2
gh issue create -t "Build Application Detail Page" -b "Route: /applications/:id" -m $M2
gh issue create -t "Add status transition buttons" -b "calls PATCH /api/v1/applications/{id}/status" -m $M2
gh issue create -t "Build Companies Page" -b "List view of all companies" -m $M2
gh issue create -t "Add loading spinners and error toasts" -b "Using react-hot-toast or sonner" -m $M2

# Sprint 3 Issues
echo "Creating Sprint 3 issues..."
gh issue create -t "Add Recharts bar chart to Dashboard" -b "Applications by status" -m $M3
gh issue create -t "Make all pages responsive" -b "Mobile-first with Tailwind breakpoints" -m $M3
gh issue create -t "Build Settings Page" -b "Profile info + logout" -m $M3
gh issue create -t "Add frontend tests" -b "With Vitest + React Testing Library (auth flow, form validation)" -m $M3
gh issue create -t "Configure CORS on the Spring Boot backend" -b "Allow the Vercel domain" -m $M3
gh issue create -t "Deploy to Vercel" -b "Connect GitHub repo → auto-deploys" -m $M3
gh issue create -t "Update README.md" -b "With frontend section and screenshots" -m $M3

rm m1.json m2.json m3.json

echo "Done!"
