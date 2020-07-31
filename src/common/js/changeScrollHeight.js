export function changeScrollHeight(list, ele, scroll, num) {
  if (list.length > 0) {
    ele.style.height = `calc(100% - ${num}px)`
    scroll.refresh()
  }
}