type PropImgs = {
  imgList: Array<{ img?: string; desc?: string }>;
};
export default function ImagesProduct({ imgList }: PropImgs) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {imgList.map((e) => (
        <img alt={e.desc} src={e.img} className="flex-1 w-full" />
      ))}
    </div>
  );
}
