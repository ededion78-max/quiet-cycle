import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — My Cycle" },
      { name: "description", content: "Frequently asked questions about menstrual cycle tracking and the My Cycle app." },
    ],
  }),
});

const faqs = [
  {
    q: "What is a normal menstrual cycle length?",
    a: "A normal menstrual cycle ranges from 21 to 35 days, with the average being 28 days. However, every woman is different, and slight variations are completely normal. If your cycle is consistently shorter than 21 days or longer than 35 days, consider consulting a healthcare provider."
  },
  {
    q: "How does the prediction algorithm work?",
    a: "Our app calculates the average of your last 3 cycle lengths to predict your next period. The more cycles you log, the more accurate the prediction becomes. We also factor in conditions like PCOS and endometriosis which may cause irregular cycles."
  },
  {
    q: "What is ovulation and when does it occur?",
    a: "Ovulation is when an egg is released from the ovary. It typically occurs around day 14 of a 28-day cycle (14 days before your next period). Our app calculates your fertile window as 5 days around your predicted ovulation day."
  },
  {
    q: "Is my data private?",
    a: "Absolutely. All your data is stored locally on your device using localStorage. Nothing is sent to any server. Your health information stays completely private. You can export your data as a backup or delete it at any time from Settings."
  },
  {
    q: "What is PMS and when does it start?",
    a: "Premenstrual Syndrome (PMS) includes symptoms like mood swings, bloating, cramps, headaches, and cravings. It usually starts 1-2 weeks before your period (during the luteal phase) and ends when menstruation begins."
  },
  {
    q: "How can I make my periods less painful?",
    a: "Try: applying heat to your lower abdomen, gentle yoga (child's pose, fetal position), drinking ginger or chamomile tea, eating anti-inflammatory foods (salmon, berries), taking walks, and practicing deep breathing. If pain is severe, consult your doctor."
  },
  {
    q: "What does PCOS mean for my cycle?",
    a: "Polycystic Ovary Syndrome (PCOS) can cause irregular or missed periods, heavy bleeding, and difficulty predicting cycles. The app's PCOS mode adjusts predictions to account for longer, more variable cycle lengths."
  },
  {
    q: "How do I know if my flow is normal?",
    a: "Average blood loss during a period is 30-40ml (about 2-3 tablespoons). If you soak through a pad or tampon every 1-2 hours, or your period lasts more than 7 days, it may be considered heavy bleeding and worth discussing with a doctor."
  },
  {
    q: "Why should I track my symptoms?",
    a: "Tracking symptoms helps you identify patterns in your cycle, anticipate PMS, communicate effectively with healthcare providers, and understand how your cycle affects your daily life. It's a powerful tool for self-awareness."
  },
  {
    q: "Can I use this app for pregnancy planning?",
    a: "Yes! Switch to Pregnancy Planning mode on the home screen. The app will highlight your fertile window and ovulation day to help you identify the best times for conception."
  },
];

function FAQPage() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <HelpCircle className="w-10 h-10 text-primary mx-auto mb-3" />
        <h1 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-sm text-muted-foreground mt-1">Everything you need to know about your cycle</p>
      </motion.div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card-premium overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 text-left flex items-center gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{faq.q}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            {openIndex === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-5 pb-4"
              >
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
