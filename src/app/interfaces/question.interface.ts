export interface QuestionInterface {
  id: string;
  question: string;
  options: string[];
  answer: string; // La bonne réponse
  category_id: string; // Identifiant de la catégorie à laquelle la question appartient (par exemple, "Programmation", "Algorithmique", etc.)
  created_at: string; // Date de création de la question (par exemple, '2025-03-21T00:00:00.000Z')
  marked?: boolean; // Indique si la question a été marquée pour révision
}
