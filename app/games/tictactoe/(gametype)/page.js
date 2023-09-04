function page({ params }) {
  console.log('dasdas');
  return (
    <div>
      page
      <p>{params.gametype}</p>
    </div>
  );
}

export default page;
