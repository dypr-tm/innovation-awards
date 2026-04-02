import { MdGroups, MdLightbulb, MdTrendingUp } from "react-icons/md";

export default function AboutPage() {
  const teamMembers = [
    { name: "Andi Saputra", role: "Head of Innovation Center", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Andi" },
    { name: "Rina Wijaya", role: "Innovation Strategist", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Rina" },
    { name: "Budi Santoso", role: "Tech Lead", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Budi" },
    { name: "Siti Nurhaliza", role: "Product Manager", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Siti" },
    { name: "Kevin Hartono", role: "UI/UX Designer", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Kevin" },
    { name: "Maya Indah", role: "Community Manager", img: "https://api.dicebear.com/7.x/notionists/svg?seed=Maya" },
  ];

  return (
    <div className="pt-12 pb-24 bg-white overflow-hidden">
      {/* Visi Section with Illustration */}
      <section className="container mx-auto px-6 max-w-5xl mb-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex-shrink-0">
            {/* Playful Illustration Placeholder */}
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-yellow-100 rounded-full scale-95 origin-center animate-pulse"></div>
              <div className="absolute inset-4 bg-pegadaian-green rounded-[12px] rotate-3 opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <svg className="w-full h-full text-pegadaian-green" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 20C55.817 20 20 55.817 20 100C20 144.183 55.817 180 100 180C144.183 180 180 144.183 180 100C180 55.817 144.183 20 100 20ZM100 160C66.863 160 40 133.137 40 100C40 66.863 66.863 40 100 40C133.137 40 160 66.863 160 100C160 133.137 133.137 160 100 160Z" fill="currentColor"/>
                  <path d="M100 60C77.909 60 60 77.909 60 100C60 122.091 77.909 140 100 140C122.091 140 140 122.091 140 100C140 77.909 122.091 60 100 60ZM100 120C88.954 120 80 111.046 80 100C80 88.954 88.954 80 100 80C111.046 80 120 88.954 120 100C120 111.046 111.046 120 100 120Z" fill="#F8C51B"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-extrabold text-pegadaian-green mb-6 tracking-tight leading-tight">
              Mewujudkan <br className="hidden md:block"/>
              <span className="text-pegadaian-yellow">Masa Depan Bersama</span>
            </h1>
            <div className="bg-gray-50 p-6 rounded-[12px] border-l-4 border-pegadaian-yellow mb-6 shadow-sm">
              <h3 className="text-lg font-bold text-pegadaian-green mb-2 flex items-center gap-2">
                <MdLightbulb className="text-pegadaian-yellow" size={24} />
                Visi Kami
              </h3>
              <p className="text-gray-700 italic">
                "Menjadi motor penggerak transformasi digital dan inovasi berkelanjutan."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-[12px] border-l-4 border-pegadaian-green shadow-sm">
              <h3 className="text-lg font-bold text-pegadaian-green mb-2 flex items-center gap-2">
                <MdTrendingUp className="text-pegadaian-green" size={24} />
                Misi Kami
              </h3>
              <p className="text-gray-700">
                Memfasilitasi ide-ide kreatif dari seluruh insan Pegadaian dan mewujudkannya menjadi solusi nyata yang berdampak pada pengalaman nasabah dan efisiensi perusahaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Kami Section */}
      <section className="container mx-auto px-6 max-w-5xl bg-gray-50/50 py-16 rounded-[12px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-pegadaian-green mb-4 inline-flex items-center justify-center gap-4">
            <MdGroups className="text-pegadaian-yellow" size={40} />
            Tim Kami
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Orang-orang dibalik layar yang mendengarkan, mengevaluasi, dan membantu merealisasikan ide-ide brilian Anda.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="w-40 md:w-48 text-center group">
              <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full bg-white pegadaian-shadow p-2 mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full rounded-full object-cover bg-gray-50"
                  loading="lazy"
                />
              </div>
              <h4 className="text-lg font-bold text-pegadaian-green group-hover:text-pegadaian-yellow transition-colors">{member.name}</h4>
              <p className="text-sm font-medium text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
