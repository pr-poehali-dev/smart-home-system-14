import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Молоко цельное",
    category: "Жирность 3,8%",
    location: "1 литр",
    year: "120 ₽",
    image: "https://cdn.poehali.dev/projects/6cda51bd-6f27-43e1-bfa8-7c996170583f/files/6b21105f-e689-4059-a51e-ce40a97b95da.jpg",
  },
  {
    id: 2,
    title: "Творог домашний",
    category: "Жирность 9%",
    location: "400 грамм",
    year: "240 ₽",
    image: "https://cdn.poehali.dev/projects/6cda51bd-6f27-43e1-bfa8-7c996170583f/files/4f7da185-7be3-41f4-a658-17612d8b35e7.jpg",
  },
  {
    id: 3,
    title: "Сметана фермерская",
    category: "Жирность 25%",
    location: "300 грамм",
    year: "190 ₽",
    image: "https://cdn.poehali.dev/projects/6cda51bd-6f27-43e1-bfa8-7c996170583f/files/277b895f-e5eb-407d-a5fc-b6232c57fea3.jpg",
  },
  {
    id: 4,
    title: "Масло сливочное",
    category: "Жирность 82,5%",
    location: "200 грамм",
    year: "280 ₽",
    image: "https://cdn.poehali.dev/projects/6cda51bd-6f27-43e1-bfa8-7c996170583f/files/e7485c18-69bc-4da0-8eef-2e8e54bc005f.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Свежее с фермы</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наша продукция</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть весь каталог
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-foreground font-medium text-base">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}