/* =========================================================================
   Good Fruit — Local Bible fallback data (KJV public domain)
   - Used when STEP Bible API is unreachable (CORS / offline)
   - Five representative chapters seeded; structure is extendable
   - Public domain, no licensing constraint
   ========================================================================= */
window.GF_BIBLE = {
  books: [
    { id: 'GEN', name: 'Genesis', chapters: 50, testament: 'OT' },
    { id: 'PSA', name: 'Psalms', chapters: 150, testament: 'OT' },
    { id: 'PRO', name: 'Proverbs', chapters: 31, testament: 'OT' },
    { id: 'ISA', name: 'Isaiah', chapters: 66, testament: 'OT' },
    { id: 'MAT', name: 'Matthew', chapters: 28, testament: 'NT' },
    { id: 'MRK', name: 'Mark', chapters: 16, testament: 'NT' },
    { id: 'LUK', name: 'Luke', chapters: 24, testament: 'NT' },
    { id: 'JHN', name: 'John', chapters: 21, testament: 'NT' },
    { id: 'ROM', name: 'Romans', chapters: 16, testament: 'NT' },
    { id: 'COR1', name: '1 Corinthians', chapters: 16, testament: 'NT' },
    { id: 'GAL', name: 'Galatians', chapters: 6, testament: 'NT' },
    { id: 'EPH', name: 'Ephesians', chapters: 6, testament: 'NT' },
    { id: 'PHP', name: 'Philippians', chapters: 4, testament: 'NT' },
    { id: 'JAS', name: 'James', chapters: 5, testament: 'NT' },
  ],

  /* Daily verse rotation — 14 verses keyed by day-of-year mod 14 */
  dailyVerses: [
    { ref: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
    { ref: 'Psalm 23:1', text: 'The LORD is my shepherd; I shall not want.' },
    { ref: 'Philippians 4:13', text: 'I can do all things through Christ which strengtheneth me.' },
    { ref: 'Jeremiah 29:11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
    { ref: 'Romans 8:28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
    { ref: 'Isaiah 41:10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.' },
    { ref: 'Proverbs 3:5–6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
    { ref: 'Matthew 11:28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
    { ref: '1 John 4:19', text: 'We love him, because he first loved us.' },
    { ref: 'Galatians 5:22–23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.' },
    { ref: 'Psalm 46:10', text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
    { ref: 'Joshua 1:9', text: 'Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.' },
    { ref: '2 Corinthians 5:17', text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.' },
    { ref: 'Hebrews 11:1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
  ],

  /* Sample chapter texts — KJV (public domain). Format: book id + chapter -> verses[] */
  chapters: {
    'JHN-1': {
      title: 'John 1',
      verses: [
        { n: 1, t: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
        { n: 2, t: 'The same was in the beginning with God.' },
        { n: 3, t: 'All things were made by him; and without him was not any thing made that was made.' },
        { n: 4, t: 'In him was life; and the life was the light of men.' },
        { n: 5, t: 'And the light shineth in darkness; and the darkness comprehended it not.' },
        { n: 6, t: 'There was a man sent from God, whose name was John.' },
        { n: 7, t: 'The same came for a witness, to bear witness of the Light, that all men through him might believe.' },
        { n: 8, t: 'He was not that Light, but was sent to bear witness of that Light.' },
        { n: 9, t: 'That was the true Light, which lighteth every man that cometh into the world.' },
        { n: 10, t: 'He was in the world, and the world was made by him, and the world knew him not.' },
        { n: 11, t: 'He came unto his own, and his own received him not.' },
        { n: 12, t: 'But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name.' },
        { n: 13, t: 'Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God.' },
        { n: 14, t: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.' },
        { n: 15, t: 'John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me.' },
        { n: 16, t: 'And of his fulness have all we received, and grace for grace.' },
        { n: 17, t: 'For the law was given by Moses, but grace and truth came by Jesus Christ.' },
        { n: 18, t: 'No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him.' },
      ],
    },

    'JHN-3': {
      title: 'John 3',
      verses: [
        { n: 1, t: 'There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:' },
        { n: 2, t: 'The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.' },
        { n: 3, t: 'Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.', wj: true },
        { n: 4, t: 'Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother\u2019s womb, and be born?' },
        { n: 5, t: 'Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.', wj: true },
        { n: 6, t: 'That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.', wj: true },
        { n: 7, t: 'Marvel not that I said unto thee, Ye must be born again.', wj: true },
        { n: 16, t: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', wj: true },
        { n: 17, t: 'For God sent not his Son into the world to condemn the world; but that the world through him might be saved.', wj: true },
      ],
    },

    'PSA-23': {
      title: 'Psalm 23',
      verses: [
        { n: 1, t: 'The LORD is my shepherd; I shall not want.' },
        { n: 2, t: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
        { n: 3, t: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\u2019s sake.' },
        { n: 4, t: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.' },
        { n: 5, t: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.' },
        { n: 6, t: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.' },
      ],
    },

    'PHP-4': {
      title: 'Philippians 4',
      verses: [
        { n: 4, t: 'Rejoice in the Lord alway: and again I say, Rejoice.' },
        { n: 5, t: 'Let your moderation be known unto all men. The Lord is at hand.' },
        { n: 6, t: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.' },
        { n: 7, t: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
        { n: 8, t: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.' },
        { n: 13, t: 'I can do all things through Christ which strengtheneth me.' },
        { n: 19, t: 'But my God shall supply all your need according to his riches in glory by Christ Jesus.' },
      ],
    },

    'GAL-5': {
      title: 'Galatians 5',
      verses: [
        { n: 13, t: 'For, brethren, ye have been called unto liberty; only use not liberty for an occasion to the flesh, but by love serve one another.' },
        { n: 14, t: 'For all the law is fulfilled in one word, even in this; Thou shalt love thy neighbour as thyself.' },
        { n: 22, t: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith,' },
        { n: 23, t: 'Meekness, temperance: against such there is no law.' },
        { n: 25, t: 'If we live in the Spirit, let us also walk in the Spirit.' },
      ],
    },

    'ROM-8': {
      title: 'Romans 8',
      verses: [
        { n: 1, t: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.' },
        { n: 28, t: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
        { n: 31, t: 'What shall we then say to these things? If God be for us, who can be against us?' },
        { n: 37, t: 'Nay, in all these things we are more than conquerors through him that loved us.' },
        { n: 38, t: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,' },
        { n: 39, t: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.' },
      ],
    },

    'MAT-5': {
      title: 'Matthew 5',
      verses: [
        { n: 3, t: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.', wj: true },
        { n: 4, t: 'Blessed are they that mourn: for they shall be comforted.', wj: true },
        { n: 5, t: 'Blessed are the meek: for they shall inherit the earth.', wj: true },
        { n: 6, t: 'Blessed are they which do hunger and thirst after righteousness: for they shall be filled.', wj: true },
        { n: 7, t: 'Blessed are the merciful: for they shall obtain mercy.', wj: true },
        { n: 8, t: 'Blessed are the pure in heart: for they shall see God.', wj: true },
        { n: 9, t: 'Blessed are the peacemakers: for they shall be called the children of God.', wj: true },
        { n: 14, t: 'Ye are the light of the world. A city that is set on an hill cannot be hid.', wj: true },
        { n: 16, t: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.', wj: true },
      ],
    },
  },
};
