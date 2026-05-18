type MedidaDiagramaProps = {
  ancho: string;
  perfil: string;
  rodado: string;
};

export default function MedidaDiagrama({ ancho, perfil, rodado }: MedidaDiagramaProps) {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Diagrama de medida ${ancho}/${perfil} R${rodado}`}
      role="img"
    >
      <circle cx="140" cy="140" r="95" stroke="#0d1b2a" strokeWidth="18" fill="#f0f2f4" />
      <circle cx="140" cy="140" r="55" stroke="#0d1b2a" strokeWidth="4" fill="#ffffff" />

      <line x1="45" y1="140" x2="235" y2="140" stroke="#e84e0f" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="45,140 55,135 55,145" fill="#e84e0f" />
      <polygon points="235,140 225,135 225,145" fill="#e84e0f" />
      <text x="140" y="128" textAnchor="middle" fill="#0d1b2a" fontSize="13" fontWeight="700">
        {ancho} mm
      </text>

      <line x1="198" y1="198" x2="198" y2="82" stroke="#e84e0f" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="198,82 193,92 203,92" fill="#e84e0f" />
      <polygon points="198,198 193,188 203,188" fill="#e84e0f" />
      <text x="218" y="145" fill="#0d1b2a" fontSize="12" fontWeight="700">
        {perfil}%
      </text>

      <line x1="140" y1="140" x2="140" y2="45" stroke="#e84e0f" strokeWidth="2" strokeDasharray="6 4" />
      <text x="140" y="38" textAnchor="middle" fill="#0d1b2a" fontSize="12" fontWeight="700">
        R{rodado}
      </text>

      <text x="140" y="268" textAnchor="middle" fill="#4a6070" fontSize="11">
        Vista lateral del neumático
      </text>
    </svg>
  );
}
