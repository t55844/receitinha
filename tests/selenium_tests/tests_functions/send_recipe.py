from time import sleep
from tests_functions.helpers_functions import fill_form
from tests_functions.my_recipe_list import click_myRecipe_link


def send_recipe(driver, By):
    tab_send_recipe = driver.find_element(
        By.XPATH, '/html/body/div[1]/div[2]/div[1]/div/div/div/button[2]')
    tab_send_recipe.click()
    sleep(2)
    add_ingredient_button = driver.find_element(
        By.XPATH, '/html/body/div[1]/div[2]/div[3]/div/form/div/div[2]/button')

    add_ingredient_button.click()
    add_ingredient_button.click()
    add_ingredient_button.click()
    sleep(2)

    fill_form(driver, By)
    sleep(2)

    send_recipe_button = driver.find_element(
        By.XPATH, '/html/body/div[1]/div[2]/div[3]/div/form/div/button')
    send_recipe_button.click()
    sleep(2)

    click_myRecipe_link(driver, By)

    driver.execute_script(
        "window.scrollTo(0, (document.body.scrollHeight/1.5));")
    sleep(1.5)
