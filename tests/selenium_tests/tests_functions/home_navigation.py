from time import sleep

# Clicla no link que vai direto para a rome


def click_link_home(driver, By):
    driver.find_element(
        By.XPATH, "/html/body/div[1]/div[1]/nav/ol/li[1]/a").click()


# Apenas rola sobre a pagina e testa o link da home


def home_navigation(driver, By):
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/4.5));")
    sleep(1.5)
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/4));")
    sleep(1.5)
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/3));")
    sleep(1.5)
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/2));")
    sleep(1.5)
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/1.5));")
    sleep(1.5)
    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/1));")
    sleep(3)
    click_link_home(driver, By)
    sleep(3)
