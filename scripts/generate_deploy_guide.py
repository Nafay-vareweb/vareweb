#!/usr/bin/env python3
"""Generate VareWeb Studio Vercel + MariaDB Deployment Guide PDF."""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.lib.units import cm, inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak,
    Table, TableStyle, Image, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# ─── Font Registration ─────────────────────────────────────────
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
pdfmetrics.registerFont(TTFont('Calibri', '/usr/share/fonts/truetype/english/calibri-regular.ttf'))
pdfmetrics.registerFont(TTFont('Calibri-Bold', '/usr/share/fonts/truetype/english/calibri-bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')
registerFontFamily('Calibri', normal='Calibri', bold='Calibri-Bold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ─── Colors ────────────────────────────────────────────────────
PURPLE = colors.HexColor('#3a1a70')
PURPLE_LIGHT = colors.HexColor('#5b2d9e')
DARK_BLUE = colors.HexColor('#1F4E79')
LIGHT_GRAY = colors.HexColor('#F5F5F5')
ACCENT_GOLD = colors.HexColor('#D4AF37')

# ─── Styles ────────────────────────────────────────────────────
cover_title = ParagraphStyle(
    name='CoverTitle', fontName='Times New Roman', fontSize=36,
    leading=44, alignment=TA_CENTER, textColor=PURPLE, spaceAfter=12
)
cover_subtitle = ParagraphStyle(
    name='CoverSubtitle', fontName='Times New Roman', fontSize=16,
    leading=22, alignment=TA_CENTER, textColor=colors.HexColor('#555555'), spaceAfter=8
)
cover_info = ParagraphStyle(
    name='CoverInfo', fontName='Times New Roman', fontSize=12,
    leading=18, alignment=TA_CENTER, textColor=colors.HexColor('#777777')
)

h1 = ParagraphStyle(
    name='H1', fontName='Times New Roman', fontSize=20, leading=26,
    textColor=PURPLE, spaceBefore=18, spaceAfter=10
)
h2 = ParagraphStyle(
    name='H2', fontName='Times New Roman', fontSize=15, leading=20,
    textColor=DARK_BLUE, spaceBefore=14, spaceAfter=8
)
h3 = ParagraphStyle(
    name='H3', fontName='Times New Roman', fontSize=12, leading=16,
    textColor=colors.HexColor('#333333'), spaceBefore=10, spaceAfter=6
)
body = ParagraphStyle(
    name='Body', fontName='Times New Roman', fontSize=10.5, leading=16,
    alignment=TA_JUSTIFY, spaceAfter=6
)
code_style = ParagraphStyle(
    name='Code', fontName='DejaVuSans', fontSize=8.5, leading=12,
    textColor=colors.HexColor('#1a1a1a'), backColor=colors.HexColor('#f4f4f4'),
    leftIndent=12, rightIndent=12, spaceBefore=4, spaceAfter=4,
    borderPadding=6
)
bullet_style = ParagraphStyle(
    name='Bullet', fontName='Times New Roman', fontSize=10.5, leading=16,
    alignment=TA_LEFT, leftIndent=24, bulletIndent=12, spaceAfter=4
)
note_style = ParagraphStyle(
    name='Note', fontName='Times New Roman', fontSize=10, leading=14,
    textColor=colors.HexColor('#8B6914'), backColor=colors.HexColor('#FFF8E7'),
    leftIndent=12, rightIndent=12, borderPadding=8, spaceBefore=6, spaceAfter=6
)
tbl_header = ParagraphStyle(
    name='TblHeader', fontName='Times New Roman', fontSize=10,
    textColor=colors.white, alignment=TA_CENTER
)
tbl_cell = ParagraphStyle(
    name='TblCell', fontName='Times New Roman', fontSize=9.5,
    textColor=colors.black, alignment=TA_LEFT
)
tbl_cell_center = ParagraphStyle(
    name='TblCellCenter', fontName='Times New Roman', fontSize=9.5,
    textColor=colors.black, alignment=TA_CENTER
)

# ─── Document ──────────────────────────────────────────────────
output_path = '/home/z/my-project/download/VareWeb_Vercel_MariaDB_Deployment_Guide.pdf'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    topMargin=2*cm, bottomMargin=2*cm, leftMargin=2.5*cm, rightMargin=2.5*cm,
    title='VareWeb_Vercel_MariaDB_Deployment_Guide',
    author='Z.ai', creator='Z.ai',
    subject='Step-by-step guide to deploy VareWeb Studio on Vercel with MariaDB'
)

story = []

# ─── Cover Page ────────────────────────────────────────────────
story.append(Spacer(1, 100))
story.append(Paragraph('<b>VareWeb Studio</b>', cover_title))
story.append(Spacer(1, 16))
story.append(Paragraph('<b>Vercel + MariaDB Deployment Guide</b>', cover_subtitle))
story.append(Spacer(1, 36))
story.append(Paragraph('Complete step-by-step instructions for hosting your<br/>Next.js application on Vercel and connecting a MariaDB database<br/>for the admin dashboard and all backend services.', cover_info))
story.append(Spacer(1, 60))
story.append(Paragraph('Version 1.0 | April 2026', cover_info))
story.append(PageBreak())

# ─── Table of Contents (manual but structured) ─────────────────
story.append(Paragraph('<b>Table of Contents</b>', h1))
story.append(Spacer(1, 12))

toc_items = [
    ('1.', 'Overview and Prerequisites'),
    ('2.', 'Setting Up MariaDB Database'),
    ('3.', 'Configuring Environment Variables'),
    ('4.', 'Vercel Deployment Steps'),
    ('5.', 'Database Migration on Vercel'),
    ('6.', 'Setting Up the Admin User'),
    ('7.', 'Post-Deployment Checklist'),
    ('8.', 'Troubleshooting Common Issues'),
    ('9.', 'MariaDB Connection Pooling for Production'),
]
for num, title in toc_items:
    story.append(Paragraph(f'{num} {title}', body))
story.append(Spacer(1, 18))

# ─── Section 1: Overview ──────────────────────────────────────
story.append(Paragraph('<b>1. Overview and Prerequisites</b>', h1))
story.append(Paragraph(
    'This guide walks you through deploying the VareWeb Studio Next.js application to Vercel, '
    'the industry-leading serverless deployment platform, and connecting it to a MariaDB database. '
    'VareWeb Studio is a full-featured digital agency website built with Next.js 16, React 19, '
    'Prisma ORM, GSAP animations, and a custom JWT authentication system. The admin dashboard '
    'manages blog posts, resumes, client forms, contact submissions, job listings, and user accounts '
    'with role-based access control. All of this data is stored in the database, making MariaDB '
    'integration essential for production use.', body))

story.append(Paragraph('<b>What You Will Need</b>', h2))
story.append(Paragraph('Before you begin, ensure you have the following accounts and tools ready:', body))
story.append(Paragraph('- A <b>Vercel account</b> (free tier works) at vercel.com', bullet_style))
story.append(Paragraph('- A <b>GitHub account</b> to push your code (Vercel connects to Git repositories)', bullet_style))
story.append(Paragraph('- A <b>MariaDB database</b> (see Section 2 for hosting options)', bullet_style))
story.append(Paragraph('- <b>Node.js 18+</b> or <b>Bun</b> installed locally for testing', bullet_style))
story.append(Paragraph('- Your project code pushed to a GitHub repository', bullet_style))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>Architecture Overview</b>', h2))
story.append(Paragraph(
    'In this deployment architecture, Vercel handles the frontend and serverless API routes. '
    'Each API route runs as an independent serverless function, which connects to your MariaDB '
    'database over a secure network connection. The database is hosted separately on a managed '
    'service such as DigitalOcean, Aiven, PlanetScale, or AWS RDS. Prisma ORM manages all '
    'database interactions and uses a singleton pattern to prevent connection exhaustion in '
    'the serverless environment. Authentication uses JWT tokens signed with a secret key stored '
    'in Vercel environment variables, and cookies are set as httpOnly for security.', body))

# ─── Section 2: MariaDB Setup ─────────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>2. Setting Up MariaDB Database</b>', h1))
story.append(Paragraph(
    'You have several options for hosting a MariaDB database that works well with Vercel. '
    'Each option offers different levels of management, pricing, and performance characteristics. '
    'The key requirement is that the database must be accessible over the internet via a connection '
    'string, and ideally support SSL/TLS encrypted connections for security.', body))

story.append(Paragraph('<b>Recommended MariaDB Hosting Providers</b>', h2))

providers_data = [
    [Paragraph('<b>Provider</b>', tbl_header), Paragraph('<b>Free Tier</b>', tbl_header),
     Paragraph('<b>Starting Price</b>', tbl_header), Paragraph('<b>Best For</b>', tbl_header)],
    [Paragraph('DigitalOcean Managed DB', tbl_cell), Paragraph('No', tbl_cell_center),
     Paragraph('$15/mo', tbl_cell_center), Paragraph('Simple setup, good performance', tbl_cell)],
    [Paragraph('Aiven', tbl_cell), Paragraph('Yes (Free plan)', tbl_cell_center),
     Paragraph('Free / $19/mo', tbl_cell_center), Paragraph('Free tier, generous limits', tbl_cell)],
    [Paragraph('PlanetScale (MySQL)', tbl_cell), Paragraph('Yes (Hobby)', tbl_cell_center),
     Paragraph('Free / $39/mo', tbl_cell_center), Paragraph('Branching, non-blocking schema', tbl_cell)],
    [Paragraph('AWS RDS', tbl_cell), Paragraph('No', tbl_cell_center),
     Paragraph('~$15/mo', tbl_cell_center), Paragraph('Enterprise, existing AWS users', tbl_cell)],
    [Paragraph('Azure Database for MariaDB', tbl_cell), Paragraph('Yes (12 months)', tbl_cell_center),
     Paragraph('Free tier', tbl_cell_center), Paragraph('Enterprise, Azure ecosystem', tbl_cell)],
    [Paragraph('Supabase (PostgreSQL)', tbl_cell), Paragraph('Yes', tbl_cell_center),
     Paragraph('Free / $25/mo', tbl_cell_center), Paragraph('PostgreSQL alternative', tbl_cell)],
]

t = Table(providers_data, colWidths=[120, 80, 80, 190])
t.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), LIGHT_GRAY),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('BACKGROUND', (0, 4), (-1, 4), LIGHT_GRAY),
    ('BACKGROUND', (0, 5), (-1, 5), colors.white),
    ('BACKGROUND', (0, 6), (-1, 6), LIGHT_GRAY),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(Spacer(1, 18))
story.append(t)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 1.</b> MariaDB/MySQL hosting providers comparison', ParagraphStyle(
    name='Caption', fontName='Times New Roman', fontSize=9, alignment=TA_CENTER,
    textColor=colors.HexColor('#555555')
)))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>Step-by-Step: Create a MariaDB Database (DigitalOcean Example)</b>', h2))
story.append(Paragraph(
    'If you are using DigitalOcean (a popular and affordable choice), follow these steps to create '
    'your managed MariaDB database cluster. The process is similar across other providers.', body))
story.append(Paragraph('<b>Step 1:</b> Log in to your DigitalOcean dashboard and navigate to "Databases".', bullet_style))
story.append(Paragraph('<b>Step 2:</b> Click "Create Database" and select "MariaDB" as the engine.', bullet_style))
story.append(Paragraph('<b>Step 3:</b> Choose a plan (the $15/mo Basic plan is sufficient for starting).', bullet_style))
story.append(Paragraph('<b>Step 4:</b> Select a data center region closest to your Vercel deployment region.', bullet_style))
story.append(Paragraph('<b>Step 5:</b> Set a database name (e.g., "vareweb_db") and a strong admin password.', bullet_style))
story.append(Paragraph('<b>Step 6:</b> Enable "Trusted Sources" and add Vercel IP ranges or allow all (for testing).', bullet_style))
story.append(Paragraph('<b>Step 7:</b> Click "Create Database" and wait for provisioning (about 5 minutes).', bullet_style))
story.append(Paragraph('<b>Step 8:</b> Once ready, copy the connection string from the database overview page.', bullet_style))

story.append(Spacer(1, 12))
story.append(Paragraph('<b>Important: Trusted Sources / Firewall</b>', h2))
story.append(Paragraph(
    'Most cloud database providers restrict incoming connections by default. You must configure '
    'the firewall (often called "Trusted Sources" or "Allowed IP Addresses") to allow connections '
    'from Vercel. Since Vercel serverless functions use dynamic IP addresses, you have two options: '
    'either allow all IPv4 addresses (0.0.0.0/0) which is less secure, or use a connection pooling '
    'service like PlanetScale or Prisma Accelerate that has fixed IP addresses. For initial setup, '
    'allowing all IPs is acceptable, but consider tightening security for production.', body))

# ─── Section 3: Environment Variables ─────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>3. Configuring Environment Variables</b>', h1))
story.append(Paragraph(
    'Environment variables are critical for your application to work correctly in production. '
    'These variables contain sensitive information like database credentials and JWT secrets, '
    'and should never be committed to version control. The project includes an .env.example file '
    'that lists all required variables. You will configure these in three places: your local .env '
    'file for development, and in the Vercel dashboard for production.', body))

story.append(Paragraph('<b>Required Environment Variables</b>', h2))

env_data = [
    [Paragraph('<b>Variable</b>', tbl_header), Paragraph('<b>Description</b>', tbl_header),
     Paragraph('<b>Example Value</b>', tbl_header)],
    [Paragraph('DATABASE_URL', tbl_cell), Paragraph('MariaDB connection string', tbl_cell),
     Paragraph('mysql://user:pass@host:3306/db', tbl_cell)],
    [Paragraph('JWT_SECRET', tbl_cell), Paragraph('Secret key for JWT token signing', tbl_cell),
     Paragraph('a-random-32-char-string', tbl_cell)],
    [Paragraph('NEXT_PUBLIC_APP_URL', tbl_cell), Paragraph('Your production URL', tbl_cell),
     Paragraph('https://vareweb.com', tbl_cell)],
]

t2 = Table(env_data, colWidths=[120, 160, 190])
t2.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), LIGHT_GRAY),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(Spacer(1, 18))
story.append(t2)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 2.</b> Required environment variables', ParagraphStyle(
    name='Caption2', fontName='Times New Roman', fontSize=9, alignment=TA_CENTER,
    textColor=colors.HexColor('#555555')
)))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>Generating a Secure JWT Secret</b>', h2))
story.append(Paragraph(
    'The JWT_SECRET variable is used to sign authentication tokens. It must be a long, random string '
    'that is unique to your deployment. Never use the default development secret in production. '
    'You can generate a secure random string using the following command in your terminal:', body))
story.append(Paragraph('openssl rand -base64 32', code_style))
story.append(Paragraph(
    'Copy the output and use it as your JWT_SECRET value. This will generate a 44-character base64-encoded '
    'string that provides excellent entropy for cryptographic signing. Store this value securely because '
    'anyone with this secret can forge authentication tokens for your application.', body))

story.append(Paragraph('<b>Database Connection String Format</b>', h2))
story.append(Paragraph(
    'The MariaDB connection string follows the standard MySQL format. Replace the placeholders with '
    'your actual database credentials. Most hosting providers will give you the exact connection string '
    'to use, which you can copy and paste directly into Vercel environment variables:', body))
story.append(Paragraph('mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME', code_style))
story.append(Paragraph(
    'For example, if your database is on DigitalOcean with username "doadmin", password "abc123", '
    'host "db-mysql-nyc3-12345.do-user-1234567-0.b.db.ondigitalocean.com", port "25060", and '
    'database name "vareweb_db", the connection string would be constructed accordingly. Always '
    'verify the connection works locally before deploying.', body))

# ─── Section 4: Vercel Deployment ─────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>4. Vercel Deployment Steps</b>', h1))
story.append(Paragraph(
    'Deploying to Vercel is straightforward since the project has already been configured for '
    'serverless deployment. The following steps assume your code is already pushed to a GitHub '
    'repository. If not, create a new repository on GitHub and push your project code first, '
    'making sure to exclude the .env file (it should already be in .gitignore).', body))

story.append(Paragraph('<b>Step 1: Push Code to GitHub</b>', h2))
story.append(Paragraph(
    'First, ensure your project is a Git repository with all the latest changes committed. '
    'The key files that were modified for this deployment are prisma/schema.prisma (switched from '
    'SQLite to MySQL), next.config.ts (removed standalone output), package.json (updated build scripts '
    'with postinstall hook for Prisma generation), and src/lib/db.ts (optimized for serverless). '
    'Run the following commands from your project root:', body))
story.append(Paragraph('git add .<br/>git commit -m "Configure for Vercel + MariaDB deployment"<br/>git push origin main', code_style))

story.append(Paragraph('<b>Step 2: Connect to Vercel</b>', h2))
story.append(Paragraph(
    'Navigate to vercel.com and sign in with your GitHub account. Click the "Add New" button and '
    'select "Project". You will see a list of your GitHub repositories. Find the repository containing '
    'your VareWeb Studio project and click "Import". Vercel will automatically detect that this is a '
    'Next.js project and configure the build settings accordingly.', body))

story.append(Paragraph('<b>Step 3: Configure Build Settings</b>', h2))
story.append(Paragraph(
    'Vercel should auto-detect most settings, but verify the following on the configuration page:', body))

build_data = [
    [Paragraph('<b>Setting</b>', tbl_header), Paragraph('<b>Value</b>', tbl_header)],
    [Paragraph('Framework Preset', tbl_cell), Paragraph('Next.js (auto-detected)', tbl_cell)],
    [Paragraph('Build Command', tbl_cell), Paragraph('npx prisma generate &amp;&amp; next build', tbl_cell)],
    [Paragraph('Output Directory', tbl_cell), Paragraph('.next', tbl_cell)],
    [Paragraph('Install Command', tbl_cell), Paragraph('npm install (or leave default)', tbl_cell)],
    [Paragraph('Node.js Version', tbl_cell), Paragraph('18.x or 20.x', tbl_cell)],
]

t3 = Table(build_data, colWidths=[140, 330])
t3.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), DARK_BLUE),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
    ('BACKGROUND', (0, 1), (-1, 1), colors.white),
    ('BACKGROUND', (0, 2), (-1, 2), LIGHT_GRAY),
    ('BACKGROUND', (0, 3), (-1, 3), colors.white),
    ('BACKGROUND', (0, 4), (-1, 4), LIGHT_GRAY),
    ('BACKGROUND', (0, 5), (-1, 5), colors.white),
    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('LEFTPADDING', (0, 0), (-1, -1), 8),
    ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ('TOPPADDING', (0, 0), (-1, -1), 6),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
]))
story.append(Spacer(1, 18))
story.append(t3)
story.append(Spacer(1, 6))
story.append(Paragraph('<b>Table 3.</b> Vercel build configuration', ParagraphStyle(
    name='Caption3', fontName='Times New Roman', fontSize=9, alignment=TA_CENTER,
    textColor=colors.HexColor('#555555')
)))
story.append(Spacer(1, 18))

story.append(Paragraph('<b>Step 4: Set Environment Variables in Vercel</b>', h2))
story.append(Paragraph(
    'Before clicking "Deploy", scroll down to the "Environment Variables" section. Add the three '
    'variables from Section 3 (DATABASE_URL, JWT_SECRET, NEXT_PUBLIC_APP_URL). Make sure to select '
    'all three environments: Production, Preview, and Development. This ensures the variables are '
    'available across all deployment stages. Click "Add" for each variable and then proceed to deploy.', body))

story.append(Paragraph('<b>Step 5: Deploy</b>', h2))
story.append(Paragraph(
    'Click the "Deploy" button and wait for Vercel to build and deploy your application. The build '
    'process typically takes 2-5 minutes. During this time, Vercel will install dependencies (including '
    'running the postinstall script which generates the Prisma client), build the Next.js application, '
    'and deploy all serverless functions. You can monitor the build progress in real-time. Once complete, '
    'Vercel will assign a URL like "your-project.vercel.app" where your application will be live.', body))

# ─── Section 5: Database Migration ────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>5. Database Migration on Vercel</b>', h1))
story.append(Paragraph(
    'After the initial deployment, you need to create the database tables in your MariaDB instance. '
    'Since Vercel serverless functions are ephemeral and cannot run long-running migration commands, '
    'you must execute database migrations from your local machine. The Prisma schema has already been '
    'updated to use the MySQL provider, so you simply need to point Prisma at your production database '
    'and push the schema.', body))

story.append(Paragraph('<b>Option A: Prisma Push (Recommended for New Deployments)</b>', h2))
story.append(Paragraph(
    'If this is a fresh database with no existing data, the simplest approach is to use Prisma DB Push, '
    'which synchronizes your schema directly with the database without creating migration files. This is '
    'ideal for initial deployments. Run this command from your local project directory, temporarily '
    'overriding the DATABASE_URL to point to your production database:', body))
story.append(Paragraph('DATABASE_URL="mysql://user:pass@your-host:3306/vareweb_db" npx prisma db push', code_style))
story.append(Paragraph(
    'This command will connect to your MariaDB database, read the Prisma schema, and create all '
    'the necessary tables, columns, indexes, and relationships. It will also add the relation mode '
    'configuration that enables referential integrity through Prisma rather than database-level '
    'foreign keys (which is important for serverless environments).', body))

story.append(Paragraph('<b>Option B: Prisma Migrate (For Production Iterations)</b>', h2))
story.append(Paragraph(
    'If you prefer to use migration files for version control and reproducibility, you can use Prisma '
    'Migrate. This approach creates SQL migration files that can be tracked in Git and applied '
    'reliably in any environment. The workflow is as follows:', body))
story.append(Paragraph('npx prisma migrate dev --name init', code_style))
story.append(Paragraph(
    'This creates a migration file in the prisma/migrations/ directory. For applying migrations to '
    'production from your local machine, use the deploy command:', body))
story.append(Paragraph('DATABASE_URL="mysql://user:pass@your-host:3306/vareweb_db" npx prisma migrate deploy', code_style))

# ─── Section 6: Admin User Setup ──────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>6. Setting Up the Admin User</b>', h1))
story.append(Paragraph(
    'After the database tables are created, you need to create at least one admin user account to '
    'access the dashboard. Since the database is now empty, you can use Prisma Studio (a visual '
    'database browser) or run a quick script to create the initial admin user. The password must '
    'be hashed with bcrypt, which is already a dependency in your project.', body))

story.append(Paragraph('<b>Method 1: Using Prisma Studio (GUI)</b>', h2))
story.append(Paragraph(
    'Prisma Studio is a built-in visual database browser that lets you view and edit records in your '
    'database tables. Connect it to your production database and manually insert an admin user. '
    'Note that the password must be a bcrypt hash, so you will need to generate one first:', body))
story.append(Paragraph('# In your terminal, generate a bcrypt hash for your desired password<br/>node -e "const bcrypt = require(\'bcryptjs\'); bcrypt.hash(\'YourSecurePassword123\', 10).then(h => console.log(h))"', code_style))
story.append(Paragraph(
    'Copy the generated hash, then run Prisma Studio connected to your production database:', body))
story.append(Paragraph('DATABASE_URL="mysql://user:pass@your-host:3306/vareweb_db" npx prisma studio', code_style))
story.append(Paragraph(
    'Open the User table in Prisma Studio and add a new record with the following values: '
    'username: "admin", password: (paste the bcrypt hash), name: "Admin", role: "ADMIN", '
    'isActive: true, passwordChangeRequest: false.', body))

story.append(Paragraph('<b>Method 2: Using a Seed Script</b>', h2))
story.append(Paragraph(
    'For a more repeatable approach, you can create a Prisma seed script. Create a file at '
    'prisma/seed.ts with code that uses bcrypt to hash the password and then creates the admin '
    'user using Prisma Client. Add the seed script to package.json and run it against your '
    'production database using the DATABASE_URL override, similar to the migration commands above.', body))

# ─── Section 7: Post-Deployment ───────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>7. Post-Deployment Checklist</b>', h1))
story.append(Paragraph(
    'After your application is deployed and the database is configured, run through this checklist '
    'to ensure everything is working correctly. Each item is critical for a fully functional '
    'production deployment.', body))

checklist = [
    ('Public Website', 'Visit your Vercel URL and verify the homepage loads with all animations'),
    ('Admin Login', 'Navigate to /admin/login and log in with your admin credentials'),
    ('Dashboard', 'Verify the dashboard loads and displays correct statistics'),
    ('Blog Management', 'Create a test blog post and verify it appears on the public /blog page'),
    ('Contact Form', 'Submit a test contact form and verify it appears in admin panel'),
    ('Career Applications', 'Submit a test application and verify it shows in admin careers'),
    ('Database Connection', 'Check Vercel function logs for any database connection errors'),
    ('Environment Variables', 'Verify no secrets are exposed in client-side JavaScript bundles'),
    ('HTTPS', 'Confirm the site loads over HTTPS (Vercel provides this by default)'),
    ('Custom Domain', 'Configure your custom domain in Vercel settings (optional)'),
]

for i, (item, desc) in enumerate(checklist):
    bg = colors.white if i % 2 == 0 else LIGHT_GRAY
    story.append(Paragraph(f'<b>{item}:</b> {desc}', bullet_style))

# ─── Section 8: Troubleshooting ───────────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>8. Troubleshooting Common Issues</b>', h1))
story.append(Paragraph(
    'This section covers the most common issues encountered when deploying a Next.js + Prisma '
    'application to Vercel with MariaDB, along with their solutions. Each issue includes symptoms, '
    'root causes, and step-by-step resolution instructions.', body))

story.append(Paragraph('<b>Issue 1: "Prisma Client not generated" Error</b>', h2))
story.append(Paragraph(
    'This error occurs when the Prisma Client is not generated before the Next.js build starts. '
    'The solution is already configured in the project: the postinstall script in package.json runs '
    '"prisma generate" automatically. If you see this error, ensure the build command in Vercel '
    'is set to "npx prisma generate &amp;&amp; next build" as specified in Table 3. You can also '
    'verify this by checking the Vercel build logs for the "Generated Prisma Client" message.', body))

story.append(Paragraph('<b>Issue 2: Database Connection Timeout</b>', h2))
story.append(Paragraph(
    'If API routes timeout when trying to connect to the database, check the following: '
    'First, verify the DATABASE_URL is correct and includes the port number (default MySQL port is '
    '3306, but some providers use custom ports like 25060). Second, check if the database firewall '
    'allows connections from all IPs (required for Vercel serverless functions). Third, test the '
    'connection from your local machine using the same DATABASE_URL to rule out credential issues. '
    'Fourth, consider adding "?connection_limit=1" to the DATABASE_URL to avoid connection pool '
    'exhaustion in the serverless environment.', body))

story.append(Paragraph('<b>Issue 3: "Cannot find module" for Prisma Client</b>', h2))
story.append(Paragraph(
    'This happens when there is a mismatch between the Prisma Client version and the schema version. '
    'Make sure the same version of @prisma/client and prisma are installed in package.json. The '
    'postinstall hook should handle client generation, but if issues persist, you can add a '
    '"prisma generate" step explicitly in the build command. Also ensure there is no prisma '
    'directory in .vercelignore or any ignore configuration that might prevent it from being '
    'included in the deployment bundle.', body))

story.append(Paragraph('<b>Issue 4: JWT Token Verification Fails</b>', h2))
story.append(Paragraph(
    'If users are logged out immediately after logging in, or if the admin panel shows '
    'authentication errors, the JWT_SECRET may not be set correctly in Vercel environment variables. '
    'Verify that the JWT_SECRET is identical across all environments (Production, Preview, Development) '
    'in the Vercel dashboard. Also ensure that the secret is at least 32 characters long. '
    'Note that changing the JWT_SECRET will invalidate all existing tokens, requiring users to '
    'log in again.', body))

story.append(Paragraph('<b>Issue 5: Build Fails with TypeScript Errors</b>', h2))
story.append(Paragraph(
    'The project is configured with ignoreBuildErrors: true in next.config.ts, so TypeScript errors '
    'should not block the build. However, if you encounter other build failures, check the Vercel '
    'build logs for specific error messages. Common causes include missing dependencies (run npm install '
    'locally to verify), incompatible package versions, or insufficient memory during the build. '
    'If the build fails due to memory, try setting the NODE_OPTIONS environment variable to '
    '"--max-old-space-size=4096" in Vercel settings.', body))

# ─── Section 9: Connection Pooling ───────────────────────────
story.append(Spacer(1, 18))
story.append(Paragraph('<b>9. MariaDB Connection Pooling for Production</b>', h1))
story.append(Paragraph(
    'In a serverless environment like Vercel, each API route invocation creates a separate function '
    'instance that may establish its own database connection. Without proper connection management, '
    'this can quickly exhaust the database connection limit, especially under high traffic. '
    'Connection pooling is essential for production deployments to ensure efficient resource '
    'utilization and prevent database connection exhaustion errors.', body))

story.append(Paragraph('<b>Understanding the Problem</b>', h2))
story.append(Paragraph(
    'MariaDB has a default maximum connection limit (often 151 connections). Each Vercel serverless '
    'function invocation that queries the database opens a new connection. During traffic spikes, '
    'hundreds of concurrent requests can open hundreds of connections, exceeding the database limit '
    'and causing "Too many connections" errors. The global singleton pattern used in db.ts helps '
    'within a single function instance, but Vercel spins up multiple instances simultaneously, '
    'each with its own Prisma Client and connection pool.', body))

story.append(Paragraph('<b>Recommended Solutions</b>', h2))

story.append(Paragraph('<b>Solution 1: Prisma Connection Limit Parameter</b>', h3))
story.append(Paragraph(
    'Add connection limit parameters to your DATABASE_URL to control how many connections each '
    'Prisma Client instance can open. This is the simplest approach and works well for most '
    'deployments with moderate traffic:', body))
story.append(Paragraph('DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=5&amp;pool_timeout=10"', code_style))
story.append(Paragraph(
    'Setting connection_limit to 5 means each serverless function instance maintains at most 5 '
    'connections. This reduces the total number of connections across all instances while still '
    'allowing efficient query execution within each function.', body))

story.append(Paragraph('<b>Solution 2: External Connection Pooler (Advanced)</b>', h3))
story.append(Paragraph(
    'For high-traffic deployments, consider using an external connection pooler like ProxySQL, '
    'PgBouncer (for PostgreSQL), or the built-in pooling provided by some managed database services. '
    'PlanetScale, for example, includes built-in connection pooling with a fixed pool endpoint. '
    'Aiven provides connection pooling through its connection management features. These services '
    'maintain a pool of long-lived database connections and multiplex thousands of short-lived '
    'client connections over them, dramatically reducing the total connection count on the database.', body))

story.append(Paragraph('<b>Solution 3: Increase Database Connection Limit</b>', h3))
story.append(Paragraph(
    'As a last resort, you can increase the max_connections setting on your MariaDB server. '
    'This can be done through your database provider is management console or by modifying the '
    'server configuration. However, increasing the limit without connection pooling is not '
    'recommended because each connection consumes database memory and CPU resources. The '
    'recommended approach is to combine a reasonable connection limit per function instance '
    'with an appropriately sized database plan that supports your expected connection count.', body))

# ─── Build PDF ────────────────────────────────────────────────
doc.build(story)
print(f"PDF generated: {output_path}")
