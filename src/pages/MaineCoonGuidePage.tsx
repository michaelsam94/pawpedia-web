import { ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

const keyFacts = [
  ['Best known for', 'Large size, gentle temperament, sociable personality'],
  ['Typical life span', 'Commonly reported around 12-15 years'],
  ['Grooming need', 'Moderate to high because of the long coat'],
  ['Family fit', 'Often good for families that can handle regular coat care'],
  ['Apartment fit', 'Possible with enrichment, climbing space, and play']
];

const faqs = [
  {
    question: 'Are Maine Coon cats good family pets?',
    answer: 'Maine Coon cats are often described as gentle, sociable, and patient, which can make them a strong fit for many families. They still need supervised introductions, respectful handling from children, and regular grooming because their long coat can mat without care.'
  },
  {
    question: 'Do Maine Coon cats need a lot of grooming?',
    answer: 'Maine Coons usually need more grooming than short-haired breeds. A realistic routine includes brushing several times per week, checking for mats behind the legs and under the chest, and keeping nails, ears, and dental care on a regular schedule.'
  },
  {
    question: 'Can a Maine Coon live in an apartment?',
    answer: 'A Maine Coon can live in an apartment when the home gives them enough enrichment. Tall cat trees, sturdy scratching posts, interactive play, window perches, and predictable feeding routines help large indoor cats stay active and less bored.'
  }
];

export function MaineCoonGuidePage() {
  usePageMeta({
    title: 'Maine Coon Cat Guide | Temperament, Grooming, Family Fit',
    description: 'Learn whether a Maine Coon cat fits your home with plain-English guidance on temperament, grooming, apartment life, family fit, and care questions.',
    canonicalPath: '/breeds/maine-coon-cat-guide'
  });

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <main className="guide-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Link className="back-link" to="/">
        <ArrowLeft aria-hidden="true" size={18} />
        Cat breed catalog
      </Link>

      <article className="guide-article">
        <header className="guide-hero">
          <p className="eyebrow">PawPedia Cat Guide</p>
          <h1>Maine Coon Cat Guide: Temperament, Grooming, and Family Fit</h1>
          <p>
            Maine Coon cats are large, social long-haired cats often searched by people comparing
            family-friendly breeds, apartment suitability, grooming effort, and everyday care needs.
          </p>
        </header>

        <section className="answer-block" aria-labelledby="maine-coon-summary">
          <Info aria-hidden="true" size={20} />
          <div>
            <h2 id="maine-coon-summary">Quick answer</h2>
            <p>
              A Maine Coon can be a good family cat for homes that want a sociable, playful, and
              usually gentle companion. The tradeoff is practical: this breed is large, needs
              consistent grooming, and benefits from space, climbing furniture, and daily play.
            </p>
          </div>
        </section>

        <section aria-labelledby="key-facts">
          <h2 id="key-facts">Maine Coon key facts</h2>
          <dl className="fact-grid">
            {keyFacts.map(([term, detail]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="temperament">
          <h2 id="temperament">What is the Maine Coon temperament like?</h2>
          <p>
            Maine Coons are commonly described as friendly, curious, and people-oriented without
            always being clingy. Many enjoy following their people around the home, joining family
            activity, and playing into adulthood. Individual personality still depends on genetics,
            socialization, health, and the home environment.
          </p>
        </section>

        <section aria-labelledby="families">
          <h2 id="families">Are Maine Coon cats good with kids and other pets?</h2>
          <p>
            Maine Coons can fit well with children and other pets when introductions are slow and
            respectful. Their size does not make them a toy or a low-maintenance pet. Children should
            learn to avoid pulling tails, chasing, or interrupting sleep, and all cats need safe
            retreat spaces.
          </p>
        </section>

        <section aria-labelledby="grooming">
          <h2 id="grooming">How much grooming does a Maine Coon need?</h2>
          <p>
            The long coat is the main care commitment. Plan for brushing several times per week,
            more during shedding seasons, and quick checks for mats. Grooming is easier when started
            early with rewards and short sessions rather than waiting until tangles become painful.
          </p>
        </section>

        <section aria-labelledby="apartment">
          <h2 id="apartment">Can Maine Coons live in apartments?</h2>
          <p>
            Yes, but the apartment needs to work for a large, active cat. Vertical territory, sturdy
            scratchers, puzzle feeders, and daily play matter more than square footage alone. A bored
            Maine Coon may become noisy, restless, or destructive if enrichment is missing.
          </p>
        </section>

        <section aria-labelledby="health-note">
          <h2 id="health-note">Health and care note</h2>
          <p>
            PawPedia is an informational breed explorer, not a veterinary service. Breed health
            fields and care notes can help you ask better questions, but they should not replace
            advice from a qualified veterinarian who knows the individual cat.
          </p>
        </section>

        <section aria-labelledby="faq">
          <h2 id="faq">Maine Coon questions people ask</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <article key={faq.question}>
                <h3>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  {faq.question}
                </h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
