import React from 'react';

export default function QuoteSection({ quote }) {
  const defaultText =
    "Di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.";
  const defaultSource = "(QS. Ar-Rum: 21)";

  const text = quote?.body || quote?.text || (typeof quote === 'string' ? quote : defaultText);
  const source = quote?.source || defaultSource;

  return (
    <section className="w-full flex justify-center py-6 px-3 min-[375px]:px-4 min-[400px]:px-6">
      <div className="w-full max-w-[460px] text-center font-isi text-[#4d3a30] text-[14px] min-[375px]:text-[15px] min-[400px]:text-[16px] leading-[1.8]" style={{ fontFamily: 'Futura Bk BT, sans-serif' }}>
        <p className="not-italic">
          {text}
        </p>
        {source && (
          <p className="mt-3 font-medium opacity-95 text-[12px] min-[375px]:text-[13px] min-[400px]:text-[14px] not-italic">
            {source}
          </p>
        )}
      </div>
    </section>
  );
}
