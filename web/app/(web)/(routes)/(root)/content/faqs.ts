import { FrequentlyAskedQuestionProps } from "@/app/(web)/(routes)/(root)/components/FrequentlyAskedQuestion"

export const faQuestions: Omit<FrequentlyAskedQuestionProps, "value">[] = [
  {
    title: "What is the Zettelkasten method?",
    content:
      "The Zettelkasten method is a note-taking and knowledge management system that emphasizes creating connections between individual notes. It helps you organize your thoughts and discover new relationships between ideas.",
  },
  {
    title: "Can I use the app offline?",
    content:
      "Yes, you can use our CLI application offline on your desktop. Your notes will sync automatically when you're back online.",
  },
  {
    title: "How secure are my notes?",
    content:
      "We take security seriously. All your notes are encrypted in transit and at rest. We use industry-standard security practices to ensure your data remains private.",
  },
  {
    title: "Can I collaborate with others?",
    content:
      "Currently, our app is designed for individual use. However, we're exploring collaboration features for future updates.",
  },
]
