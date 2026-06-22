import asyncio
from playwright.async_api import async_playwright
async def go():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':1440,'height':900})
        await pg.goto('http://localhost:5173/fangram/',wait_until='networkidle')
        await pg.wait_for_timeout(1500); await pg.mouse.move(720,450)
        for _ in range(12):
            await pg.mouse.wheel(0,300); await pg.wait_for_timeout(100)
            t=await pg.evaluate("(document.querySelector('.seq')?.getBoundingClientRect().top)||9999")
            if t < -200: break
        info = await pg.evaluate("""() => {
          const seq=document.querySelector('.seq');
          const st=document.querySelector('.seq-sticky');
          const cv=document.querySelector('.seq-canvas');
          const cs=getComputedStyle(st), cc=getComputedStyle(cv);
          return {
            seqTop: seq.getBoundingClientRect().top|0,
            stickyRect: [st.getBoundingClientRect().width|0, st.getBoundingClientRect().height|0, st.getBoundingClientRect().top|0],
            stickyPos: cs.position, stickyHeight: cs.height,
            canvasRect: [cv.getBoundingClientRect().width|0, cv.getBoundingClientRect().height|0],
            canvasAttr: [cv.width, cv.height],
            canvasCSS: [cc.width, cc.height, cc.position],
          };
        }""")
        import json; print(json.dumps(info, indent=1))
        await b.close()
asyncio.run(go())
