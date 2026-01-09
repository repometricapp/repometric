export default function clsx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}
