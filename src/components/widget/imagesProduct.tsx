type PropImgs = {
  imgList: Array<{ img?: string; desc?: string }>;
};
export default function ImagesProduct({ imgList }: PropImgs) {
  return (
    <>
      {imgList.map((e) => (
        <img alt={e.desc} src={e.img} className="w-full rounded-lg" />
      ))}
    </>
  );
}
