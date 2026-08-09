export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Was ist ein Spiking Neural Network (SNN)?",
    a: "Ein SNN ist ein neuronales Netz der dritten Generation, das Information über diskrete Spikes in der Zeit kodiert statt über kontinuierliche Aktivierungen. Neuronen feuern nur bei relevantem Input, wodurch die Berechnung ereignisgesteuert und potenziell energiesparsamer wird als bei klassischen künstlichen neuronalen Netzen.",
  },
  {
    q: "Sind SNNs immer energieeffizienter als Transformer?",
    a: "Nein. Der Energievorteil gilt nicht bedingungslos, sondern hängt von der Energie pro Spike der Zielhardware und der Rechenpräzision des Vergleichsmodells ab. Gegenüber FP32-Transformern ist das SNN durchgängig effizienter; gegenüber INT8-Transformern kippt der Vorteil bei rund 6 bis 9 pJ pro Spike.",
  },
  {
    q: "Was bedeutet der Kipppunkt in dieser Arbeit?",
    a: "Der Kipppunkt ist die Energie pro Spike, ab der ein INT8-Transformer effizienter wird als ein parametervergleichbares SNN. Er liegt bei etwa 6 bis 9 pJ pro Spike und damit unterhalb dokumentierter neuromorpher Chips wie Intel Loihi (23,6 pJ) oder IBM TrueNorth (26 pJ).",
  },
  {
    q: "Welche Daten und Modelle werden verglichen?",
    a: "Verglichen werden sechs parametervergleichbare Modelle (drei SNNs, drei Transformer, 1 bis 5 Mio. Parameter), trainiert und evaluiert auf SST-2 aus dem GLUE-Benchmark. Alle erreichen eine vergleichbare Klassifikationsgüte von rund 79 bis 84 % auf dem Dev-Set.",
  },
  {
    q: "Wie wird die Energie gemessen?",
    a: "Über ein hardwarebewusstes Energiemodell: SynOps (SNN) und MACs (Transformer) pro Inferenz werden gemessen und mit den Energiewerten nach Horowitz (2014) gewichtet — 4,6 pJ pro FP32-MAC, 0,23 pJ pro INT8-MAC — ergänzt um Speicherzugriffe über alle Zeitschritte.",
  },
  {
    q: "Welchen praktischen Nutzen hat das Ergebnis?",
    a: "Die resultierende Effizienz-Landkarte über Energie pro Spike und Rechenpräzision liefert eine Entscheidungsgrundlage: ML- und Plattform-Teams können für gegebene Zielhardware ablesen, ob sich ein SNN gegenüber einem INT8-Transformer lohnt, statt einem pauschalen Effizienzversprechen zu folgen.",
  },
];
