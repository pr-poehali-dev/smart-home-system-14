import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Какой срок годности у вашей продукции?",
    answer:
      "Поскольку мы не используем консерванты, срок хранения молока составляет 3-5 дней, творога и сметаны — до 5 дней. Это и есть признак настоящего натурального продукта. Дату изготовления вы всегда увидите на упаковке.",
  },
  {
    question: "Как и когда происходит доставка?",
    answer:
      "Мы доставляем заказы каждый день. Если оформить заказ до 12:00, вы получите продукцию в тот же день вечером. Курьер привезёт заказ прямо к двери в удобный для вас интервал времени.",
  },
  {
    question: "Сколько стоит доставка?",
    answer:
      "Доставка по городу стоит 200 рублей. При заказе на сумму от 1000 рублей мы доставляем бесплатно. В пригород стоимость рассчитывается индивидуально при оформлении заказа.",
  },
  {
    question: "Действительно ли продукция фермерская?",
    answer:
      "Да, всё молоко поступает с нашей собственной семейной фермы. Коровы пасутся на свободных лугах и питаются натуральными кормами. Мы лично контролируем весь процесс — от дойки до упаковки.",
  },
  {
    question: "Как можно оплатить заказ?",
    answer:
      "Вы можете оплатить заказ картой онлайн при оформлении, картой курьеру или наличными при получении. Выбирайте удобный для вас способ.",
  },
  {
    question: "Можно ли оформить регулярную доставку?",
    answer:
      "Конечно! Многие наши клиенты заказывают свежее молоко и творог каждую неделю. Напишите нам, и мы настроим удобный график регулярной доставки именно для вас.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}