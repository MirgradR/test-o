
const PostsBanner = () => {
  return (
    <section
      style={{
        background: 'var(--color-primary)',
        height: '5rem',
        borderRadius: '1rem',
        marginTop: '2rem',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <p
        style={{
          color: 'white',
          fontWeight: 600,
          fontSize: '1.5rem',
          lineHeight: '1.5rem',
          letterSpacing: '0.1rem'
        }}
      >
        FRONTEND MENTORS
      </p>
    </section>
  );
};

export default PostsBanner;
