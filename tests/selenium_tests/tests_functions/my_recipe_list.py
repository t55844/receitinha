from time import sleep
from tests_functions.update_form import update_recipe


def click_myRecipe_link(driver, By):
    driver.find_element(
        By.XPATH, "/html/body/div[1]/div[1]/nav/ol/li[3]/a").click()


def comment_on_recipe(driver, By):
    more_details_button_in_card = driver.find_element(
        By.XPATH, "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[1]/div/div[1]/div[2]/p/button")
    more_details_button_in_card.click()
    sleep(3)

    comment_input = driver.find_element(
        By.NAME, "comment")

    driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight);")
    comment_input.send_keys('muito bom, receita maravilhosa')
    send_comment_button = driver.find_element(By.TAG_NAME, 'button')
    driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight);")
    sleep(3)

    send_comment_button.click()
    sleep(3)


def button_delete(driver, By):
    delete_button = driver.find_element(
        By.XPATH, "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[2]/button[1]")

    delete_button.click()

# Função principal dseste modulo
# Ela navega e testas todas as interações da seção "lista das minhas receitas"


def my_reciep_list_navigate_and_buttons(driver, By):
    # acessa a seção por meio do link na barra de navegação
    click_myRecipe_link(driver, By)
    sleep(2)

    # incone de seta que expande um dropdown com mais informações
    arrow_dowm_button_in_card = driver.find_element(
        By.XPATH, "/html/body/div[1]/div[2]/div[2]/div/div/div[1]/div[1]/div/div[3]/button[3]")
    arrow_dowm_button_in_card.click()
    sleep(2)

    # clica em mais detalhe e depois comenta na receita
    comment_on_recipe(driver, By)

    click_myRecipe_link(driver, By)
    sleep(2)
    # clica no botão de deletar a receita
    button_delete(driver, By)
    sleep(2)
    update_recipe(driver, By)
