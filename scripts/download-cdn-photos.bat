@echo off
REM Telecharge les photos Google CDN vers public/photos/
REM Note : Certains URLs retournent 403 Forbidden (protection Google)
REM Les images sandwich avec suffixe s1360 fonctionnent
REM Les images avec suffixe s125 retournent de petits thumbnails ou 403

set DEST=public\photos

REM === FONCTIONNEL (suffixe s1360) ===
curl -L -o "%DEST%\sandwich-thon.jpg" "https://lh3.googleusercontent.com/food/AFj1U73y8aqU_6KdbqWLYTesh_-bObWcAXezcfyo0Rs2RXDjk9RMx5DQQUbiTlskEQ7eteOptJnPvwX8eoY4zy1OcCexecpI9VqaTGjTG1FLChLKt-gCympvG3NX3O6L_XCX-oOBxN_RJ3DAyUleu4PUkas8PkPadRgC00_BrK4ONxo=s1360-w1360-h1020-rw"
curl -L -o "%DEST%\sandwich-viande.jpg" "https://lh3.googleusercontent.com/food/AFj1U71PxB_5oUNtEDgg86g5OayeUGAffUiGO6NtVCfPlK7h4th9Bt7pVIx6XAuctVmRgWEvlV-w6BPFxzt0qt6kmrpYKn7DdxXQYQRVrkQ18VPCCSV-8Herm85PV7OSkIlwQvZq7P1uCpgJPbDGPsK9WFTUXTYt0V8P8JUywYARlVY=s1360-w1360-h1020-rw"
curl -L -o "%DEST%\sandwich-calamar.jpg" "https://lh3.googleusercontent.com/food/AFj1U70o3Tx8VvXiBw5S-keNTmoQ0OyIsHDZHs3DEYAfotj79wH9ObrjQ385MRieqwWRGmoFU8Kdk1uV9ib6qtsPZ30VWXz6Dw-F5oqousdmhy5QZ6Jn2OB8zqaSyEywhbjnxKCj5SOOqSVdJmkiYIFWPMQ9F26_A86Q56Bs_CzAzFE=s1360-w1360-h1020-rw"

REM === FONCTIONNEL (suffixe s125 mais avec redirect s1360) ===
curl -L -o "%DEST%\pasticcio-bolognaise.jpg" "https://lh3.googleusercontent.com/food/AFj1U73s7HlEcDxyK4MERv6-4CNbaUXEiuVGdkLz8-VrlanU7m11zRKDC_kYg6g25aowqLbu7_WfKJSHPEiYb9hfI1OfXgbIWyWjNxd_90Cf3v6dgzA7ulykM9oCNIZ9YzSiQGOCWW4oX60XizO1xAAEyTrHDIhpTgyEI0lQ_y1QxBU=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\galzone-thon.jpg" "https://lh3.googleusercontent.com/food/AFj1U72jzKg-rvfKeiDZdFKQo_5z1u18TWXZB0-oezK3gLkgw82n_Kl8gTY-3J2UKNjnWHOeKQErRnvHMHSl9A6VgJALOYJmYaIfRGGrwiHWb7f7PMzTaeuWkgj0HTsIf-p23N_Cm9uBQxWy3Qg-2qF4GuGkjPeRWZY_--xma8f5sC0=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\galzone-bolognaise.jpg" "https://lh3.googleusercontent.com/food/AFj1U72mRZhd4K1Xxy49b7PuC4JU2xQ-Ds-Ae4xuc0WHNyQ7ZRSsaYDWCPepJ7HP9D6Uzuf-tT7EmZNmj03nnFJSuZEl6tkBHYQL9Nhkt2uql_wHBRLcu2atz7hnqYmo0s7sURCWn9Jkv8PLj8F_WBLhda6ArsI55aym7sUmveLIfw=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\san-sebastien.jpg" "https://lh3.googleusercontent.com/food/AFj1U73P-9lXciptlDauuCyAguoG3a-YNcJhnGBC0YW2dbArUvQj6JktYVSPbUpuSTYAxbFFyoTdQZSqJJlDEOaC1n-yo52O7pqT-qx1adoXA035WH9VxpaFqBdKNMw7kEcTyuptiVCBI7271nS1CAx7rxtbozjfndpt-RiiutnLd9k=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\coconut.jpg" "https://lh3.googleusercontent.com/food/AFj1U70oWOBLuFGhJ6ZZfpuCKywSQ609bDLWNJq4pOunU_rk9hgsfAxk-AO_UqubSJcpsaIDETjh7FvpEz9O1q2DVmllNTPy-rcPf4EYjjDEXgudy6EmmauNcrM2J2_DtqgtJR4RnP8X1FvgrE4FDzjeNcjb18NT3eAAULf41WRbTds=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\couscous-vegetarien.jpg" "https://lh3.googleusercontent.com/food/AFj1U73qMaIhCFW7Ifg41Z_rb9OlTU0kJSNF6rXu2-CYx9amrY_ViHRQT6rQWrZuXNof2XfibqwdsBCmXLRw6vfzfYUg9IR17KXPuIDd_rzbxp0Rt2LYKdIe3XLWGj_WBbOLyH7F4A8EEgELUlba2kaf17zensvouKHUWp4X0c118A=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\couscous-viande.jpg" "https://lh3.googleusercontent.com/food/AFj1U73bWgicABipZ5E_edbOXKfx0dwMPUlGcTAjUaikXVg22QAIvf5boAUjdMXFxKTCVhR50MEfsBQNxaTxJTHb9l7Th2GkOCHptnHNY67ho8dpEgTi4UnY9P7MmCW2AqjUfjt_g-fu7pw1oc-Y52gf-R2IYvBEwkN-_4PSRExIwXw=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\couscous-poulet.jpg" "https://lh3.googleusercontent.com/food/AFj1U72O2rj-z9DD0Pb3V3AqBi8yqOZJEtDOQ9ku63ZU-_afjBulARzvkOujxdwZDFoniRjza7xCj6cu6JOMRn2boEXInCu_YMziphz3H2T1DEqFy4LmvtxzzHUpE3liFfsgD9kUfF35_PFhCQa5mL8KH_LwY98eeUN9tZB9B7x7mkM=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\pizza-thon.jpg" "https://lh3.googleusercontent.com/food/AFj1U70xrmvtlPnGmgafKZxPc1kWXZ51CSIDVpAVjGha_3UrynAJh1Qp3ytWpPCKgGJ3mGugxJF1u4cTVh6R8xba5fcuRwH9TzbYEu14aeGIFfJhJqSlu42Mnc47KdF-Gfn0RchFMi9w57adXvGlbafslXT5g6Mw_j3GrGAcDsamuZ8=s125-w125-h125-n-e1-rw-k-v1-no"
curl -L -o "%DEST%\pizza-margharita.jpg" "https://lh3.googleusercontent.com/food/AFj1U71Nm-bg3EpDhgdB7Jbp2kGUWCRkTtB2AHjmJ7_zKzlkZ2a8jz8SOMSp2E-qmeQBESGR9DPLraoQezZg0xtTy7X2o2iwca_dHotNPo5TP8CKibqF__5H6POAvOIJnjXlZXf01tqvVNjs7C6Fx_RuxXURUo-k_5XmlQ_aV43feg=s125-w125-h125-n-e1-rw-k-v1-no"

REM === ECHOUE (403 Forbidden) ===
REM Ces URLs sont protegees par Google et retournent 403
REM Il faut fournir des photos locales pour ces plats :
REM - Pasticcio Fruit De Mer
REM - Calzone Poulet Champignons
REM - Hamburger Double
REM - Pizza 4 Saisons

echo Termine ! Verifie le dossier %DEST%
pause
