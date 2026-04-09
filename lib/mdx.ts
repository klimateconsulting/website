import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface PostFrontmatter {
  title: string
  date: string
  author: string
  sector: string
  description: string
  readingTime: number
  image?: string
  featured?: boolean
}

export interface ProjectFrontmatter {
  title: string
  client: string
  sector: string
  date: string
  image: string
  description: string
  featured?: boolean
}

export interface TocHeading {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string): TocHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: TocHeading[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level: match[1].length })
  }
  return headings
}

export function getInsightBySlug(slug: string) {
  const filePath = path.join(contentDir, 'insights', `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  const headings = extractHeadings(content)
  return { frontmatter: data as PostFrontmatter, content, slug, headings }
}

export function getAllInsights() {
  const dir = path.join(contentDir, 'insights')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      return getInsightBySlug(slug)
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(contentDir, 'projects', `${slug}.mdx`)
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  return { frontmatter: data as ProjectFrontmatter, content, slug }
}

export function getAllProjects() {
  const dir = path.join(contentDir, 'projects')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      return getProjectBySlug(slug)
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}
