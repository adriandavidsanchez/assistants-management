export const CHAT_RESPONSES = [
  "Entendido, ¿en qué más puedo ayudarte?",
  "Esa es una excelente pregunta. Déjame explicarte...",
  "Claro, con gusto te ayudo con eso.",
  "¿Podrías darme más detalles sobre tu consulta?",
  "Perfecto, he registrado esa información.",
  "Estoy aquí para ayudarte en lo que necesites.",
  "Permíteme verificar esa información para ti.",
  "Excelente punto, te explico a continuación...",
  "¿Hay algo más en lo que pueda asistirte?",
  "Con gusto te brindo más detalles sobre eso."
];

export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * CHAT_RESPONSES.length);
  return CHAT_RESPONSES[randomIndex];
};